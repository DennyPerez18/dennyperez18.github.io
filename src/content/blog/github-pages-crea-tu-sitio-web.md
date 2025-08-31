---
title: 'Introducción a GitHub Pages: Crea tu Primer Sitio Web'
pubDate: 'Jun 13 2024'
heroImage: '../../images/blog/GitHub Pages.png'
categories: ['La escuelita de Github']
---

Si alguna vez has querido tener un sitio web propio para mostrar tus proyectos o
compartir información, **GitHub Pages** es una herramienta perfecta para ti. Es
una forma gratuita y accesible de alojar sitios web estáticos directamente desde
tus repositorios de GitHub. En este artículo, aprenderás cómo crear tu primer
sitio web paso a paso con ejemplos claros y consejos prácticos.

## **¿Qué es GitHub Pages?**

GitHub Pages es un servicio de alojamiento de sitios web estáticos que permite
publicar contenido directamente desde un repositorio de GitHub. Este servicio es
ideal para:

-   Crear portafolios.

-   Mostrar documentación.

-   Alojar blogs estáticos o proyectos simples.

**Ventajas:**

-   Es totalmente gratuito.

-   No requiere configuraciones complejas.

-   Está integrado con el flujo de trabajo de GitHub, lo que lo hace intuitivo y
    eficiente.

## **Paso a Paso: Crea tu Primer Sitio Web con GitHub Pages**

1.  **Crea un repositorio en GitHub**

    -   Accede a tu cuenta de GitHub y haz clic en el botón "+" en la esquina
        superior derecha.

    -   Selecciona **New repository**.

    -   Asigna un nombre, por ejemplo, mi-sitio-web.

    -   Asegúrate de marcar la opción "Add a README file" para incluir un
        archivo inicial.

2.  **Crea un archivo HTML simple**

    -   En tu repositorio, haz clic en "Add file \> Create new file".

    -   Nombra el archivo index.html.

    -   Agrega el siguiente contenido:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Primer Sitio Web</title>
  </head>
  <body>
    <h1>¡Hola, mundo!</h1>
    <p>Este es mi primer sitio web creado usando GitHub Pages.</p>
  </body>
</html>
```

-   Haz clic en **Commit new file** para guardar el archivo.

3.  **Habilita GitHub Pages**

    -   Ve a la pestaña **Settings** de tu repositorio.

    -   Desplázate hasta la sección **Pages**.

    -   En "Branch", selecciona main y haz clic en **Save**.

    -   GitHub generará una URL para tu sitio, algo como
        https://tuusuario.github.io/mi-sitio-web/.

4.  **Visita tu sitio web**

    -   Copia y pega la URL proporcionada en tu navegador. ¡Tu sitio web
        estático ahora está en línea!

## **Ejemplo: Agrega Estilo con CSS**

Para mejorar el diseño de tu sitio, puedes agregar un archivo CSS:

1.  **Crea un archivo CSS**

    -   Haz clic en "Add file \> Create new file".

    -   Nombra el archivo styles.css.

    -   Agrega el siguiente contenido:

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
  color: #333;
  text-align: center;
  margin: 20px;
}

h1 {
  color: #4682b4;
}
```

2.  **Conecta el CSS al HTML**

    -   Edita el archivo index.html y agrega esta línea dentro de la etiqueta
        `<head>`:

```html
<link rel="stylesheet" href="styles.css">
```

3.  **Guarda los cambios y revisa tu sitio**

    -   Actualiza tu navegador para ver los cambios en el diseño.

## **Tips y Buenas Prácticas**

-   **Estructura tu repositorio:** Organiza los archivos en carpetas como css,
    images o js para mantener el proyecto limpio.

-   **Usa un dominio personalizado:** Configura un dominio propio desde las
    opciones de **Settings \> Pages** para personalizar la URL de tu sitio.

-   **Explora Jekyll:** Para proyectos más avanzados, GitHub Pages soporta
    Jekyll, un generador de sitios estáticos que facilita la creación de blogs y
    documentación.

## **Recursos Adicionales**

-   [<u>Documentación oficial de GitHub Pages</u>](https://docs.github.com/en/pages)

-   [<u>Tutorial de Jekyll para GitHub Pages</u>](https://jekyllrb.com/)

¡Con GitHub Pages, crear un sitio web nunca fue tan sencillo! Anímate a
experimentar y comparte tus proyectos con el mundo.
