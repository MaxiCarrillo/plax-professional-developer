<a name="readme-top"></a>
<div align="center">
  
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

![IsologotipoPlax](https://github.com/user-attachments/assets/51626830-aebf-4062-a50f-060beaf6218b)
  
## PLAX
PLAX es una plataforma en línea que te permite reservar tu próximo alojamiento de forma rápida y sencilla. Encuentra el lugar perfecto para tus vacaciones o viaje de negocios.

[Diseño de Figma](https://www.figma.com/design/5osyQh6Ywy3KpNB6Zsbp8F/Desaf%C3%ADo-Profesional?node-id=3-316&t=Q5tFOEgoEO7msyl7-1) · [Reportar error](https://github.com/MaxiCarrillo/plax-professional-developer/issues) · [Sugerir algo](https://github.com/MaxiCarrillo/plax-professional-developer/issues)
</div>

<details>
<summary>Tabla de contenidos</summary>

- [PLAX](#plax)
- [Características principales](#características-principales)
  - [Capturas de pantalla de Plax](#capturas-de-pantalla-de-plax)
- [Para empezar](#para-empezar)
  - [Prerequisitos](#prerequisitos)
  - [Instalación](#instalación)
- [Contribuir al proyecto](#contribuir-al-proyecto)
- [🛠️ Stack](#️-stack)

</details>

## Características principales

- **Búsqueda de estancias**: Encuentra alojamientos según tus necesidades, ya sea por ubicación, precio o tipo de estancia.
- **Reserva de estancias**: Realiza reservas de forma fácil y segura directamente desde la plataforma.
- **Reseñas de usuarios**: Deja tu opinión sobre las estancias en las que te has alojado y consulta las experiencias de otros usuarios.

### Capturas de pantalla de Plax

![Captura de pantalla en ordenador](https://github.com/user-attachments/assets/66d753f2-3ab9-4c48-904c-9838b4e62812)
![Captura de pantalla en móvil](https://github.com/user-attachments/assets/f13204f1-e1b7-47e1-a3c3-a262ebc70a1c)



<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Para empezar

### Prerequisitos

#### Frontend

- **Node.js** (versión 16 o superior recomendada)
  
  ```sh
  # Comprueba si tienes Node.js instalado
  node -v

  # Si no está instalado, descárgalo desde la página oficial:
  # https://nodejs.org/
  ```

- **NPM** (incluido con Node.js) o **Yarn** (opcional, si prefieres usarlo)

  ```sh
  # Actualiza NPM a la última versión
  npm install -g npm@latest

  # O instala Yarn si prefieres usarlo
  npm install -g yarn
  ```

#### Backend

- **Java** (versión 11 o superior)
  
  ```sh
  # Verifica si tienes Java instalado
  java -version

  # Descárgalo desde https://www.oracle.com/java/ o https://openjdk.org/ si no está instalado
  ```

- **Maven** (administrador de dependencias para el backend)
  
  ```sh
  # Verifica si tienes Maven instalado
  mvn -v

  # Descárgalo desde https://maven.apache.org/ si no está instalado
  ```

### Instalación

#### Frontend

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tuusuario/plax.git
   cd plax/frontend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   # O si usas Yarn
   yarn install
   ```

3. Inicia la aplicación:

   ```sh
   npm run
   # O con Yarn
   yarn run
   ```

#### Backend

1. Dirígete al directorio del backend:

   ```sh
   cd plax/backend
   ```

2. Compila el proyecto con Maven:

   ```sh
   mvn clean install
   ```

3. Inicia el servidor:

   ```sh
   mvn spring-boot:run
   ```

#### Inicializar base de datos

2. La aplicación está configurada para inicializar datos automáticamente al iniciar el servidor.
  
       
### Notas adicionales

- Asegúrate de que el backend esté configurado para conectar con una base de datos activa.
- Si necesitas configurar credenciales o URLs personalizadas, edita el archivo `application.properties` en el backend.
- La aplicación cuenta con una base de datos con datos (Es necesario ejecutar manualmente el script SQL)
- Usuarios predefinidos:
     - Todos los usuarios tienen la contraseña: `12345678`.
     - El administrador tiene la contraseña: `admin123` y su correo es `admin@gmail.com`

<p align="right">(<a href="#top">Volver arriba</a>)</p>

## Contribuir al proyecto

Las contribuciones son lo que hacen que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. ¡Cualquier contribución que hagas es **muy apreciada**!

Si tienes alguna sugerencia que podría mejorar el proyecto, por favor haz un [_fork_](https://github.com/MaxiCarrillo/plax-professional-developer/fork) del repositorio y crea una [_pull request_](https://github.com/MaxiCarrillo/plax-professional-developer/pulls). También puedes simplemente abrir un [_issue_](https://github.com/MaxiCarrillo/plax-professional-developer/issues) con la etiqueta "enhancement".

Aquí tienes una guía rápida:

1. Haz un [_fork_](https://github.com/MaxiCarrillo/plax-professional-developer/fork) del Proyecto
2. Clona tu [_fork_](https://github.com/MaxiCarrillo/plax-professional-developer/fork) (`git clone <URL del fork>`)
3. Añade el repositorio original como remoto (`git remote add upstream <URL del repositorio original>`)
4. Crea tu Rama de Funcionalidad (`git switch -c feature/CaracteristicaIncreible`)
5. Realiza tus Cambios (`git commit -m 'Add: alguna CaracterísticaIncreible'`)
6. Haz Push a la Rama (`git push origin feature/CaracteristicaIncreible`)
7. Abre una [_pull request_](https://github.com/MaxiCarrillo/plax-professional-developer/pulls)

**¡Gracias a todos los colaboradores que han hecho posible este proyecto!**

[![Contribuidores](https://contrib.rocks/image?repo=MaxiCarrillo/plax-professional-developer&max=500&columns=20)](https://github.com/MaxiCarrillo/plax-professional-developer/graphs/contributors)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## 🛠️ Stack

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,javascript,java,spring,maven,nodejs,git,css,html,figma,ai,photoshop,mysql" />
  </a>
</p>

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>


[contributors-shield]: https://img.shields.io/github/contributors/MaxiCarrillo/plax-professional-developer.svg?style=for-the-badge
[contributors-url]: https://github.com/MaxiCarrillo/plax-professional-developer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/MaxiCarrillo/plax-professional-developer.svg?style=for-the-badge
[forks-url]: https://github.com/MaxiCarrillo/plax-professional-developer/network/members
[stars-shield]: https://img.shields.io/github/stars/MaxiCarrillo/plax-professional-developer.svg?style=for-the-badge
[stars-url]: https://github.com/MaxiCarrillo/plax-professional-developer/stargazers
[issues-shield]: https://img.shields.io/github/issues/MaxiCarrillo/plax-professional-developer.svg?style=for-the-badge
[issues-url]: https://github.com/MaxiCarrillo/plax-professional-developer/issues
