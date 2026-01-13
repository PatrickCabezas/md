# Editor de Markdown

Una aplicación web moderna y completa para editar y previsualizar documentos Markdown en tiempo real. Desarrollada con HTML5, CSS3 y JavaScript puro, sin dependencias de frameworks externos.

## 📋 Características

### ✨ Funcionalidades Principales

- **Editor en tiempo real**: Escribe Markdown y ve la previsualización instantáneamente
- **Vista dividida**: Editor a la izquierda y previsualización a la derecha
- **Vista completa**: Modo de solo previsualización para una experiencia inmersiva
- **Persistencia automática**: Tu contenido se guarda automáticamente en el navegador (localStorage)
- **Interfaz moderna**: Diseño oscuro y limpio con transiciones suaves

### 🛠️ Herramientas de Formato Disponibles

La aplicación incluye una barra de herramientas completa con botones para insertar:

#### Formato de Texto Básico
- **Negrita** (`**texto**`)
- **Cursiva** (`*texto*`)
- **Tachado** (`~~texto~~`)

#### Encabezados
- **H1** (`# Título`)
- **H2** (`## Título`)
- **H3** (`### Título`)

#### Listas
- **Lista desordenada** (`- item`)
- **Lista ordenada** (`1. item`)
- **Lista de tareas** (`- [ ] Tarea`)

#### Elementos Especiales
- **Cita** (`> texto`)
- **Código inline** (`` `código` ``)
- **Bloque de código** (``` código ```)

#### Enlaces e Imágenes
- **Enlace** (`[texto](url)`)
- **Imagen** (`![alt](url)`)

#### Otros Elementos
- **Tabla**: Inserta una tabla de ejemplo con 3 columnas y 2 filas
- **Línea horizontal** (`---`)

## 📁 Estructura del Proyecto

```
Editor/
│
├── index.html          # Archivo principal HTML
├── styles.css          # Estilos CSS de la aplicación
├── script.js           # Lógica JavaScript
└── README.md           # Este archivo
```

## 🚀 Cómo Usar

### Instalación

No requiere instalación. Simplemente:

1. Descarga o clona los archivos del proyecto
2. Asegúrate de tener los tres archivos en la misma carpeta:
   - `index.html`
   - `styles.css`
   - `script.js`

### Ejecución

1. Abre el archivo `index.html` en tu navegador web moderno
2. ¡Listo! La aplicación está lista para usar

**Nota**: Necesitas conexión a internet para cargar la librería Marked.js desde el CDN.

## 💡 Guía de Uso

### Uso Básico

1. **Escribir Markdown**: Simplemente escribe en el área del editor a la izquierda
2. **Ver Previsualización**: La previsualización se actualiza automáticamente mientras escribes
3. **Usar Botones de Formato**: 
   - Selecciona texto y haz clic en un botón para aplicar formato
   - O haz clic en un botón sin seleccionar texto para insertar un placeholder

### Vista Completa

- Haz clic en el botón **"Vista Completa"** para ocultar el editor y ver solo la previsualización
- La barra de herramientas se oculta automáticamente en este modo
- Haz clic en **"Volver a editar"** para restaurar la vista dividida

### Persistencia

- Tu contenido se guarda automáticamente en el navegador
- Al recargar la página, tu trabajo se mantiene
- Los datos se almacenan en `localStorage` del navegador

## 🎨 Características de Diseño

- **Modo Oscuro**: Interfaz con tema oscuro por defecto
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Transiciones Suaves**: Animaciones fluidas entre modos de vista
- **Scrollbars Personalizados**: Barras de desplazamiento estilizadas
- **Fuentes Optimizadas**: 
  - Sans-serif para la interfaz
  - Monoespaciada para el editor

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con flexbox y transiciones
- **JavaScript (ES6+)**: Lógica de la aplicación con clases
- **Marked.js**: Librería externa para renderizar Markdown (vía CDN)

## 📝 Ejemplos de Markdown Soportados

La aplicación soporta todos los elementos estándar de Markdown:

```markdown
# Encabezado 1
## Encabezado 2
### Encabezado 3

**Texto en negrita** y *texto en cursiva*

- Lista desordenada
- Otro elemento

1. Lista ordenada
2. Segundo elemento

- [ ] Tarea pendiente
- [x] Tarea completada

> Esta es una cita

`código inline`

```
Bloque de código
```

[Enlace](https://ejemplo.com)

![Imagen](https://ejemplo.com/imagen.jpg)

| Columna 1 | Columna 2 |
|-----------|-----------|
| Fila 1    | Fila 1    |

---

Línea horizontal
```

## 🌐 Compatibilidad

La aplicación funciona en todos los navegadores modernos que soporten:
- HTML5
- CSS3 (Flexbox)
- JavaScript ES6+
- localStorage API

Navegadores probados:
- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)

## 📌 Notas Importantes

- **Conexión a Internet**: Se requiere conexión para cargar Marked.js desde el CDN
- **Almacenamiento Local**: Los datos se guardan en el navegador, no en un servidor
- **Sin Backend**: Esta es una aplicación completamente del lado del cliente

## 🔄 Actualizaciones Futuras

Posibles mejoras futuras:
- Exportar a PDF
- Exportar a HTML
- Temas personalizables (claro/oscuro)
- Soporte para múltiples documentos
- Atajos de teclado
- Modo de solo lectura

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso libre.

## 👨‍💻 Autor

Desarrollado como una aplicación de demostración de capacidades de desarrollo web con tecnologías puras.

---

**¡Disfruta editando Markdown!** 🎉
