# AzChat

Documentación de una aplicación web de mensajería privada para estudiantes, con registro de cuentas, chats de texto entre dos personas e historial conservado.

El proyecto utiliza una **metodología Ágil, incremental e iterativa**: entregas pequeñas, revisión frecuente y ajustes de requisitos y diseño. La capacidad objetivo de la primera versión es de 30 personas conectadas simultáneamente.

## Consultar la documentación

Consulta la [documentación en GitHub Pages](https://antonioapazaq1701-cmyk.github.io/AzChat/). También puedes descargar el repositorio y abrir **[Documentacion/index.html](Documentacion/index.html)** con doble clic. Los documentos HTML y el diagrama se consultan sin instalar dependencias.

| Paso | Documento |
|---|---|
| P1 | [Problema y alcance](Documentacion/Planificacion/P1_Problema_y_alcance/index.html) |
| P2 | [Actores y necesidades](Documentacion/Planificacion/P2_Actores_y_necesidades/index.html) |
| P3 | [Catálogo de requisitos](Documentacion/Planificacion/P3_Catalogo_de_requisitos/index.html) |
| P4 | [Modelo de casos de uso](Documentacion/Planificacion/P4_Modelo_de_casos_de_uso/index.html) |
| P5 | [Especificación de requisitos](Documentacion/Planificacion/P5_Especificacion_de_requisitos/index.html) |
| P6 | [Clases de análisis](Documentacion/Planificacion/P6_Clases_de_analisis/index.html) |
| P7 | [Documento de análisis](Documentacion/Planificacion/P7_Documento_de_analisis/index.html) |
| P8 | [Clases de diseño](Documentacion/Planificacion/P8_Clases_de_diseno/index.html) |
| P9 | [Arquitectura y capas](Documentacion/Planificacion/P9_Arquitectura_y_capas/index.html) |

El modelo de P4 está disponible como **[archivo editable de Draw.io](Documentacion/Planificacion/P4_Modelo_de_casos_de_uso/Casos_de_uso_AzChat.drawio)** y como **[vista SVG](Documentacion/Planificacion/P4_Modelo_de_casos_de_uso/Casos_de_uso_AzChat.svg)**.

P5 incluye el flujo de envío y P6 el modelo de clases de análisis; ambos tienen archivos Draw.io editables y vistas SVG en sus carpetas.

P7 incluye la secuencia de envío, P8 las clases de diseño y P9 la arquitectura. Sus diagramas están disponibles como archivos Draw.io y vistas SVG.

P10 a P12 se desarrollarán en los siguientes pasos. El contenido actual corresponde a la planificación del sistema.

## Funciones previstas

- Registro con nombre completo, código de estudiante, nombre de usuario y contraseña.
- Ingreso mediante usuario o código, junto con la contraseña.
- Búsqueda por nombre de usuario exacto.
- Chats privados con mensajes de hasta 1000 caracteres.
- Historial conservado sin edición ni borrado de mensajes en la primera versión.
- Aplicación web adaptable a computadora y celular.

## Arquitectura prevista

La web utilizará HTML, CSS y JavaScript. Un único servidor Node.js con Express y Socket.IO en Render entregará la página, gestionará el acceso y distribuirá las actualizaciones. PostgreSQL administrado en Supabase conservará los datos y las sesiones de 8 horas.

La primera demostración se plantea con alojamiento gratuito, aceptando el arranque tras inactividad. GitHub Pages publica la documentación; el chat requiere construcción y despliegue posterior.

## Equipo del proyecto

| Apellidos y nombres | Código |
|---|---|
| Apaza Quispe Antonio Vicente | 236876 |
| Arias Ramirez Alex | 236104 |
| Chura Chambilla Raul Cristian | 236567 |
| Escobedo Arapa Kenyi Blanca | 236171 |
| Mamani Pari Yimmy Jonathan | 237317 |
| Quispe Ramos Daniel Jhosimar | 236568 |
| Roque Mamani Vidman Ruis | 236232 |
| Vidal Fuentes Jordy Anthony | 236535 |
