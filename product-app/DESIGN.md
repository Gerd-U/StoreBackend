---
name: ProductHub
description: Catálogo de electrónica con la gramática de las tiendas de Akihabara, en voz baja.
colors:
  sign-yellow: "#f6d93b"
  sign-soft: "#fbf0b4"
  signal-red: "#cf2a24"
  signal-deep: "#a51f1a"
  wire-blue: "#2c5fd9"
  ink: "#141413"
  ink-2: "#1e1e1c"
  ink-3: "#2d2d2a"
  ink-soft: "#5a5953"
  paper: "#f8f7f3"
  paper-2: "#efede6"
  card: "#ffffff"
  line: "#e2dfd5"
typography:
  display:
    fontFamily: "Dela Gothic One, Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  hero:
    fontFamily: "Dela Gothic One, Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "4.75rem"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  numeral:
    fontFamily: "Dela Gothic One, Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "5rem"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "Dela Gothic One, Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.15
  title:
    fontFamily: "Dela Gothic One, Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  wordmark:
    fontFamily: "Dela Gothic One, Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 0.92
  body:
    fontFamily: "Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  control:
    fontFamily: "Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.4
  data:
    fontFamily: "Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.4
    fontFeature: "tnum"
rounded:
  card: "3px"
  field: "6px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-tablet: "32px"
  gutter-desktop: "48px"
  shelf-gap-x: "24px"
  shelf-gap-y: "32px"
components:
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.card}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.signal-deep}"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 20px"
  icon-button:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    size: "36px"
  icon-button-hover:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
  nav-sign-lit:
    backgroundColor: "{colors.sign-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
  nav-sign-unlit:
    textColor: "{colors.card}"
    rounded: "{rounded.field}"
  pop-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    height: "56px"
  search:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
---

# Design System: ProductHub

## Overview

**Creative North Star: "La calle de electrónica, de noche y en calma"**

ProductHub toma la gramática de una calle de tiendas de electrónica en Akihabara: letreros apilados para navegar y fichas POP que cuelgan de un gancho. Esta versión baja el volumen: el papel y la tinta hacen casi todo el trabajo, y los colores de letrero aparecen como acentos precisos, no como campos llenos.

Es una herramienta de trabajo. Navegación, tabla, búsqueda y formularios son controles web estándar; el mundo aporta tipografía, una paleta de cuatro tintas, densidad tranquila y un gesto propio: la ficha cuelga apenas inclinada y se endereza al tomarla.

**Key Characteristics:**
- Un solo campo de color sólido en todo el producto: la portada amarilla del inicio.
- Fichas blancas con un filo impreso de color de 6px, agujero de gancho y línea de corte punteada.
- Menú oscuro donde solo el letrero activo se enciende; los demás llevan el color únicamente en el icono.
- Líneas de 1px en tono papel en lugar de bordes negros; una acción roja por pantalla.

## Colors

Papel y tinta dominan; amarillo, rojo y azul son tintas de letrero usadas con medida.

### Primary
- **Amarillo letrero** (#f6d93b): portada del inicio, letrero "Inicio" encendido, filo de ficha, selección de texto.
- **Amarillo suave** (#fbf0b4): confirmación de copiado.

### Secondary
- **Rojo señal** (#cf2a24): la única acción principal de cada pantalla, letrero "Productos" encendido, errores. **Rojo profundo** (#a51f1a) es su hover.

### Tertiary
- **Azul cable** (#2c5fd9): letrero "Nuevo producto" encendido, foco de teclado y de campos.

### Neutral
- **Tinta** (#141413): texto principal, menú lateral.
- **Tinta 2 / 3** (#1e1e1c / #2d2d2a): superficies dentro del menú y el marco del logotipo.
- **Tinta suave** (#5a5953): texto secundario, etiquetas, iconos en reposo.
- **Papel** (#f8f7f3): fondo de trabajo. **Papel 2** (#efede6): segunda capa (selector de vista, ID generado, cabecera de tabla).
- **Tarjeta** (#ffffff): fichas, tabla, campos, botón secundario.
- **Línea** (#e2dfd5): toda división de 1px.

**The One Field Rule.** Solo la portada del inicio es un campo de color sólido. Encabezados de página, fichas y estados viven sobre papel.

**The One Red Rule.** Cada pantalla tiene como mucho una acción en rojo señal.

## Typography

**Display Font:** Dela Gothic One (with Zen Kaku Gothic New, system-ui)
**Body Font:** Zen Kaku Gothic New (with system-ui)

Dela Gothic One es la voz de los carteles POP: nombres de producto, títulos de pantalla y titulares. Zen Kaku Gothic New lleva toda la interfaz en peso regular, con negrita solo en etiquetas, botones y datos.

### Hierarchy
- **Hero** (400, 3rem→4.75rem, 0.95): titular de la portada del inicio.
- **Display** (400, 2.25rem→3.75rem, 1): título de cada pantalla.
- **Numeral** (400, 5rem): el "404".
- **Headline** (400, 1.5rem→1.875rem, 1.15): secciones y estados vacíos.
- **Title** (400, 1.375rem; 1rem compacta; 1.875rem→2.25rem destacada): nombre del producto en la ficha.
- **Body** (400, 1rem–1.125rem, 1.6): descripciones en tinta suave, máximo ~36rem.
- **Control** (400, 0.9375rem): texto dentro de la búsqueda.
- **Label** (700, 0.875rem): botones, menú, etiquetas de campo.
- **Data** (700, 0.8125rem, cifras tabulares): Resource ID.

**The Display-Is-For-Names Rule.** Dela Gothic One nunca aparece en botones, etiquetas, inputs ni datos.

## Layout

Riel oscuro de 15rem desde 1024px; debajo se vuelve barra superior con tres letreros en cuadrícula. Contenido hasta 90rem con márgenes de 20/32/48px. Encabezado de página sobre papel con una línea inferior de 1px. La vitrina usa `repeat(auto-fill, minmax(15rem, 1fr))` con 24px × 32px de separación.

**The Whole-Card Rule.** La vitrina se reordena por fichas completas; Vitrina/Lista cambia todo el estante a la vez.

## Elevation & Depth

Plano. La profundidad viene de un paso de tono (papel → tarjeta), bordes de 1px y la leve inclinación de las fichas.

**The No-Shadow Rule.** Nada en reposo lleva sombra; la opción activa del selector se marca con tarjeta sobre papel 2.

## Shapes

Fichas y tabla con radio de 3px (cartulina cortada); campos con 6px; botones, búsqueda e icon buttons en píldora. El agujero del gancho es un círculo de papel de 14px con anillo interior de 1.5px.

## Components

### Encabezado de página
- Título en Display sobre papel, precedido por el tríptico del logo (amarillo, rojo, azul) como marca vertical; descripción en tinta suave y acciones a la derecha.

### Botones
- **Primario:** píldora roja de 44px, sin borde; hover rojo profundo; al presionar escala a 0.97.
- **Secundario:** píldora blanca con borde de línea; hover borde tinta.
- **Icon button:** 36px, tinta suave; hover papel 2. Eliminar usa hover rojo al 10%.

### Ficha POP
- Tarjeta blanca, borde tinta al 15%, filo superior de 6px en el color de su posición (amarillo, rojo, azul, tinta), agujero de gancho, nombre en Title, línea de corte punteada al 20% y Resource ID en Data.
- Inclinación de −0.8° a 0.7°; al pasar el cursor o enfocar se endereza, sube 4px y su borde pasa a tinta (320ms, `cubic-bezier(0.23, 1, 0.32, 1)`). En la vitrina toda la ficha enlaza al detalle.

### Letreros de navegación
- Apagados: texto blanco al 65% con el icono en su color. Encendido: fondo lleno de su color.

### Tabla
- Cabecera en papel 2 con etiquetas pequeñas, filas separadas por línea, punto de color por producto, nombre en negrita con flecha que aparece al pasar el cursor, acciones como icon buttons.

### Avatar de usuario
- Círculo con las iniciales en Display y un tinte pálido estable por persona (amarillo suave, rojo al 12%, azul al 12% o tinta al 7%), elegido a partir de su ID. 36px en listas, 80px en detalle y vista previa.

### Campos
- Búsqueda en píldora de 44px; campos de formulario de 56px con radio de 6px. Foco: borde azul y halo azul al 10%; error: borde y halo rojos.

### Estados
- Carga: esqueletos con pulso suave (sin animación con reduced motion). Error: caja con borde rojo al 25% y fondo rojo al 4%, detalle y "Reintentar". Vacío: caja punteada al 20% con la siguiente acción.

## Do's and Don'ts

### Do:
- **Do** dar a cada ruta nueva su letrero con su propio color, encendido solo cuando está activa.
- **Do** mostrar solo los campos que la API tiene (nombre y Resource ID).
- **Do** separar superficies con tono y líneas de 1px en color línea.

### Don't:
- **Don't** volver a poner franjas de color sólido en los encabezados de página.
- **Don't** usar bordes negros gruesos, sombras en reposo ni un segundo botón rojo.
- **Don't** añadir precios, categorías o existencias inventadas, ni etiquetas en mayúsculas sobre los títulos.
