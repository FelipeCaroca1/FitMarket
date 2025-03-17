# 🏋️‍♂️ FitMarket - Tu tienda de productos fitness 🛍️

Bienvenido a **FitMarket**, la plataforma donde puedes encontrar suplementos, equipamiento, accesorios, ropa y alimentos saludables para tu estilo de vida fitness. 💪🥦

---

## 🌟 Características principales
- 🛒 **Catálogo de productos** con información detallada.
- 👤 **Registro e inicio de sesión** para una experiencia personalizada.
- 🛍️ **Carrito de compras** para agregar y gestionar productos.
- 🔒 **Pago seguro** a través de Stripe.
- 📦 **Historial de compras** para acceder a tus pedidos anteriores.

---

## 🚀 Instalación y configuración

### 1️⃣ Requisitos previos
Antes de comenzar, asegúrate de tener instalados:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### 2️⃣ Clonar el repositorio
```sh
 git clone https://github.com/FelipeCaroca1/FitMarket.git
 cd FitMarket
```

### 3️⃣ Configurar variables de entorno
Crea un archivo **.env** en la carpeta `backend` y añade lo siguiente:
```env
PORT=5000
MONGO_URI=mongodb+srv://admin:6342@cluster0.by7j7.mongodb.net/FitMarket?retryWrites=true&w=majority
JWT_SECRET=tu_secreto
STRIPE_SECRET_KEY=tu_clave_secreta_stripe
STRIPE_PUBLIC_KEY=tu_clave_publica_stripe
```

### 4️⃣ Instalar dependencias
Ejecuta los siguientes comandos en la raíz del proyecto:
```sh
cd backend
npm install
cd ../frontend
npm install
```
Para el correcto funcionamiento del historial de compras, se implementó el registro automático de órdenes mediante Webhooks de Stripe, los cuales insertan las órdenes en MongoDB después de un pago exitoso. Esto asegura que el historial sea robusto y persistente, sin depender del frontend para guardar los pedidos.

También se creó una ruta protegida para consultar el historial de compras del usuario autenticado.


### 5️⃣ Iniciar la aplicación
Ejecuta los servidores de frontend y backend en pestañas separadas:
```sh
# Iniciar el backend
cd backend
npm start
```
```sh
# Iniciar el frontend
cd frontend
npm run dev
```


## 🛠️ Tecnologías utilizadas
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Autenticación:** JSON Web Token (JWT)
- **Pago seguro:** Stripe

---

📢 ¡Gracias por usar **FitMarket**! 💖
