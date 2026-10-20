# Login NexusEdu — Lógica paso a paso

Documentación del flujo de autenticación del portal. Explica qué hace cada archivo,
en qué orden se ejecuta y cómo se conecta con la API real.

---

## 1. Arquitectura de carpetas

```
src/
├─ main.tsx                          # Punto de entrada: monta <App />
├─ App.tsx                           # Renderiza <LoginPage />
├─ index.css                         # Carga tailwindcss + tokens.css
├─ styles/
│  └─ tokens.css                     # Design tokens (colores, radios, sombras)
├─ assets/
│  └─ images/
│     └─ BannerLogin.jpg             # Imagen del panel derecho (compartida)
├─ utils/                            # Universal / reutilizable por todas las vistas
│  ├─ atoms/                         # Chip, FieldLabel, Icon, IconTile, PillButton,
│  │                                 #   PrimaryButton, StatusBadge, TextField, SectionEyebrow
│  ├─ molecules/                     # AppPreviewImage, ChipList, EmailField, FeatureCard,
│  │                                 #   InclusionQuoteCard, InfoNotice, PasswordField,
│  │                                 #   RememberSessionCheckbox
│  ├─ hooks/
│  │  └─ useTheme.ts                 # Tema claro/oscuro (data-theme) — global
│  ├─ services/
│  │  └─ apiClient.ts                # Cliente HTTP genérico
│  ├─ types/
│  │  └─ index.ts                    # IconName
│  └─ cn.ts                          # Helper de clases
└─ Login/                            # Feature: todo lo específico del inicio de sesión
   ├─ pages/
   │  └─ LoginPage.tsx               # Ensambla TopInfoBar + LoginCard + SidePanel
   ├─ sections/
   │  ├─ TopInfoBar.tsx
   │  ├─ LoginCard.tsx
   │  ├─ LoginForm.tsx
   │  ├─ SidePanel.tsx               # Oculto en móvil
   │  ├─ HeroPanel.tsx
   │  └─ FeatureCardRow.tsx
   ├─ hooks/
   │  └─ useLoginForm.ts             # Estado y submit del formulario
   ├─ services/
   │  ├─ authService.ts              # signIn / signOut / sesión / errores
   │  └─ mockAuth.ts                 # Simulación sin backend
   ├─ constants/
   │  └─ loginContent.ts             # Todos los textos del login
   ├─ types/
   │  └─ auth.ts                     # Contrato de datos de autenticación
   └─ (sin carpeta assets propia: usa src/assets/)
```

Regla de organización:

- **`src/utils/`** → todo componente/utilidad reutilizable por otras vistas.
- **`src/Login/`** → únicamente lo exclusivo del inicio de sesión.
- **`src/styles/`** → tokens globales.

---

## 2. Flujo general

```
Usuario escribe correo/contraseña
        │
        ▼
LoginForm  ──onChange──►  useLoginForm (estado)
        │
        │ onSubmit
        ▼
useLoginForm.validate()  ──►  authService.validateLogin()
        │                            │
        │  ¿errores?                 │  sí ──► muestra errores por campo
        ▼
    signIn(credentials)  ──►  authService.signIn()
                                    │
                     ┌──────────────┴──────────────┐
                VITE_USE_MOCK_API           VITE_USE_MOCK_API
                   = "false"                   ≠ "false"
                        │                           │
                apiClient.apiRequest()         mockAuth.mockSignIn()
                 POST /auth/login              (rechaza 403 demo)
                        │                           │
                        └──────────────┬────────────┘
                                       ▼
                          ¿éxito?  ──► sí: saveSession() + onSuccess()
                              │
                              └──► no: mapAuthError() ──► errors.form
```

---

## 3. Paso a paso

### Paso 1 — Arranque (`main.tsx` → `App.tsx`)

`main.tsx` monta React e importa `index.css`, que carga `tailwindcss` y
`styles/tokens.css` (todos los colores, radios y sombras viven aquí).
`App.tsx` solo renderiza `<LoginPage />`.

### Paso 2 — `LoginPage` arma la página

`Login/pages/LoginPage.tsx`:

1. Llama `useLoginForm()` una sola vez y guarda el resultado en `form`.
2. Llama `useTheme()` una sola vez (el estado NO vive en `TopInfoBar`,
   se eleva aquí para que toda la página comparta el mismo tema).
3. Toma `cycle`, `zone` y `plantelKey` de `loginContent.topBar`.
4. Renderiza:
   - `TopInfoBar` (recibe los textos y el control de tema claro/oscuro).
   - Una rejilla de 2 columnas en escritorio: `LoginCard` (izquierda) y
     `SidePanel` (derecha). En móvil solo se ve `LoginCard`.

```tsx
const form = useLoginForm()
const { theme, toggle } = useTheme()
```

### Paso 3 — `TopInfoBar`

Barra puramente presentacional. Recibe `theme` y `onToggleTheme` por props; el
botón alterna entre "Modo Oscuro" y "Modo Claro" (ícono sol/luna). No tiene
estado propio.

### Paso 4 — `LoginCard` y `LoginForm`

`LoginCard` recibe `form` y compone: encabezado de institución, título,
`<LoginForm form={form} />`, enlace de recuperación y los dos avisos
(`InfoNotice`).

`LoginForm` lee de `form`:

| Valor del hook       | Uso en UI                            |
| -------------------- | ------------------------------------ |
| `values.email`       | valor del `EmailField`               |
| `values.password`    | valor del `PasswordField`            |
| `values.remember`    | estado del `RememberSessionCheckbox` |
| `errors.email`       | error bajo el campo de correo        |
| `errors.password`    | error bajo el campo de contraseña    |
| `errors.form`        | aviso `role="alert"` general         |
| `isSubmitting`       | `loading` del `PrimaryButton`        |
| `showPassword`       | modo visible/oculto de la contraseña |

Cada `onChange` llama al setter correspondiente (`setEmail`, `setPassword`,
`setRemember`) y `onSubmit` llama a `handleSubmit`.

### Paso 5 — Estado y submit (`Login/hooks/useLoginForm.ts`)

Responsabilidades del hook:

- Mantiene `values`, `errors`, `showPassword` e `isSubmitting`.
- `setEmail` / `setPassword` limpian el error de ese campo y el error general al
  escribir.
- `togglePassword` alterna la visibilidad.
- `validate()` ejecuta `validateLogin` y guarda los errores. Devuelve `true` si
  no hay ninguno.
- `handleSubmit(e)`:
  1. `e.preventDefault()`.
  2. Si ya está enviando o `validate()` falla, termina.
  3. Cancela cualquier petición previa (`abortRef`) y crea un `AbortController`
     nuevo.
  4. `setIsSubmitting(true)`.
  5. `await signIn(values, { signal })`.
  6. `saveSession(session, values.remember)`.
  7. `onSuccess?.(session)` si el componente lo proporcionó.
  8. Si falla: `setErrors({ form: mapAuthError(error) })`.
  9. `finally`: `setIsSubmitting(false)`.
- Un `useEffect` aborta la petición al desmontar el componente (evita actualizar
  estado tras salir de la pantalla).

### Paso 6 — Validación (`authService.validateLogin`)

Se ejecuta antes de llamar a la API (primera barrera):

- Correo vacío → "Ingrese su correo institucional."
- Correo con formato inválido o dominio no permitido → mensaje de dominio.
- Dominios válidos: `@edomex.nuevaescuela.mx` y `@sep.gob.mx`
  (`isValidInstitutionalEmail`).
- Contraseña vacía → "Ingrese su contraseña de acceso."
- Contraseña menor a 8 caracteres → mensaje de longitud.

El servidor sigue siendo la autoridad final; esto solo evita peticiones obvias.

### Paso 7 — `signIn` (`Login/services/authService.ts`)

```ts
signIn(credentials, { signal })
```

- Si `VITE_USE_MOCK_API !== "false"` → usa `mockSignIn` (desarrollo).
- Si es `"false"` → llama a la API real:

```
POST {VITE_API_BASE_URL}/auth/login
Body: { email, password, remember }
```

El correo se normaliza (trim + minúsculas) antes de enviarse.

### Paso 8 — Cliente HTTP (`utils/services/apiClient.ts`)

`apiRequest<T>(path, { method, body, signal })`:

- Prefija `${API_BASE_URL}${path}` (`API_BASE_URL = VITE_API_BASE_URL ?? "/api"`).
- Envía `Accept: application/json` y `Content-Type` cuando hay body.
- Usa `credentials: "include"` (cookies de sesión).
- Aplica un timeout de 15 s con `AbortController`; combina la señal del llamador.
- Si la respuesta no es `ok`, lanza `ApiError(message, status, code)` leyendo
  `message`, `error` o `code` del cuerpo JSON.
- Si es `ok`, devuelve el JSON tipado como `T`.

### Paso 9 — Sesión

`saveSession(session, remember)`:

- `remember === true` → `localStorage` (persiste al cerrar el navegador).
- `remember === false` → `sessionStorage` (solo la pestaña actual).
- Clave usada: `nexusedu:session`.

`getSession()` lee primero de `localStorage` y luego de `sessionStorage`;
si el JSON está corrupto, limpia y devuelve `null`.
`clearSession()` borra de ambos. `signOut()` llama a `/auth/logout` (si no es
mock) y siempre limpia la sesión.

### Paso 10 — Mapeo de errores (`mapAuthError`)

Convierte el error en texto para el usuario:

| Caso                    | Mensaje                                  |
| ----------------------- | ---------------------------------------- |
| `ApiError` 401          | "Correo o contraseña incorrectos..."     |
| `ApiError` 429          | "Demasiados intentos fallidos..."        |
| `ApiError` otros        | `error.message` (viene del backend)      |
| `DOMException` Timeout  | "El servidor tardó demasiado..."         |
| `TypeError` (red)       | "No fue posible conectar con el servidor..." |
| `Error` genérico        | `error.message`                          |

### Paso 11 — Tema claro/oscuro (`utils/hooks/useTheme.ts`)

- Lee `localStorage` (`nexusedu:theme`) al iniciar; si no hay valor, usa
  `prefers-color-scheme`.
- Aplica/quita `data-theme="dark"` en `<html>`, lo que activa el segundo juego
  de tokens de `tokens.css` (paleta oscura).
- Persiste el cambio. El toggle se controla desde `TopInfoBar`.

---

## 4. Conectar la API real

1. Crea un archivo `.env` en la raíz (usa `.env.example` como base):

   ```env
   VITE_API_BASE_URL=https://api.tu-dominio.gob.mx/api
   VITE_USE_MOCK_API=false
   ```

2. Reinicia `npm run dev` (Vite solo lee variables de entorno al arrancar).

3. El backend debe exponer:

   ```
   POST /auth/login
   Request:  { "email": string, "password": string, "remember": boolean }
   Response 200:
   {
     "token": string,
     "expiresAt": string (opcional, ISO 8601),
     "user": { "id": string, "email": string, "fullName": string, "role": string }
   }
   Error (401/403/429/500): { "message": string, "code": string }
   ```

   ```
   POST /auth/logout   → 204 o 200
   ```

4. Mientras `VITE_USE_MOCK_API` sea distinto de `"false"`, el login usa
   `Login/services/mockAuth.ts` y responde 403 `ACCOUNT_NOT_PROVISIONED` con el
   aviso de Mesa de Ayuda (comportamiento actual de demostración).

---

## 5. Puntos de extensión

- **Redirección tras login**: pasar `onSuccess` a `useLoginForm`
  (`useLoginForm({ onSuccess: (session) => navigate('/panel') })`). La sesión ya
  queda guardada antes de la llamada.
- **Renovar token / adjuntar `Authorization`**: agregar el header en
  `utils/services/apiClient.ts` a partir de `getSession().token`.
- **Cerrar sesión**: llamar `signOut()` desde el menú del panel.
- **Reglas de validación**: centralizadas en `Login/services/authService.ts`.

---

## 6. Notas

- Los componentes de `src/utils/` (átomos y moléculas) y utilidades como
  `apiClient` / `useTheme` son universales: nuevas vistas (paneles por
  rol) deben reutilizarlos en lugar de duplicarlos.
- La autenticación vive en `src/Login/services/`; conviene evaluar moverla a una
  carpeta compartida si otros roles reutilizan `getSession()` / `signOut()`.
