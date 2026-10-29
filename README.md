# AzChat

Documentación de una aplicación web de mensajería privada para estudiantes, con registro de cuentas, chats de texto entre dos personas e historial conservado.

El proyecto utiliza una **metodología Ágil, incremental e iterativa**: entregas pequeñas, revisión frecuente y ajustes de requisitos y diseño. La capacidad objetivo de la primera versión es de 30 personas conectadas simultáneamente.

## Consultar la documentación

Consulta la [presentación de la planificación en GitHub Pages](https://antonioapazaq1701-cmyk.github.io/AzChat/). También puedes descargar el repositorio y abrir **[Documentacion/index.html](Documentacion/index.html)** con doble clic. Cada paso tiene una explicación web y un documento Word con mayor detalle técnico. Las páginas, los diagramas y el prototipo se consultan sin instalar dependencias.

| Paso | Presentación web | Documento técnico |
|---|---|---|
| P1 | [Problema y alcance](Documentacion/Planificacion/P1_Problema_y_alcance/index.html) | [Word](Documentacion/Documentos_Tecnicos/P01_Problema_y_alcance.docx) |
| P2 | [Actores y necesidades](Documentacion/Planificacion/P2_Actores_y_necesidades/index.html) | [Word](Documentacion/Documentos_Tecnicos/P02_Actores_y_necesidades.docx) |
| P3 | [Catálogo de requisitos](Documentacion/Planificacion/P3_Catalogo_de_requisitos/index.html) | [Word](Documentacion/Documentos_Tecnicos/P03_Catalogo_de_requisitos.docx) |
| P4 | [Casos de uso](Documentacion/Planificacion/P4_Modelo_de_casos_de_uso/index.html) | [Word](Documentacion/Documentos_Tecnicos/P04_Casos_de_uso.docx) |
| P5 | [Especificación de requisitos](Documentacion/Planificacion/P5_Especificacion_de_requisitos/index.html) | [Word](Documentacion/Documentos_Tecnicos/P05_Especificacion_de_requisitos.docx) |
| P6 | [Clases de análisis](Documentacion/Planificacion/P6_Clases_de_analisis/index.html) | [Word](Documentacion/Documentos_Tecnicos/P06_Clases_de_analisis.docx) |
| P7 | [Documento de análisis](Documentacion/Planificacion/P7_Documento_de_analisis/index.html) | [Word](Documentacion/Documentos_Tecnicos/P07_Analisis_del_sistema.docx) |
| P8 | [Clases de diseño](Documentacion/Planificacion/P8_Clases_de_diseno/index.html) | [Word](Documentacion/Documentos_Tecnicos/P08_Clases_de_diseno.docx) |
| P9 | [Arquitectura y capas](Documentacion/Planificacion/P9_Arquitectura_y_capas/index.html) | [Word](Documentacion/Documentos_Tecnicos/P09_Arquitectura_y_capas.docx) |
| P10 | [Diseño de interfaz](Documentacion/Planificacion/P10_Diseno_de_interfaz/index.html) | [Word](Documentacion/Documentos_Tecnicos/P10_Diseno_de_interfaz.docx) |
| P11 | [Modelo de datos y DER](Documentacion/Planificacion/P11_Modelo_de_datos/index.html) | [Word](Documentacion/Documentos_Tecnicos/P11_Modelo_de_datos.docx) |
| P12 | [Diseño y construcción](Documentacion/Planificacion/P12_Diseno_y_construccion/index.html) | [Word](Documentacion/Documentos_Tecnicos/P12_Diseno_y_construccion.docx) |

Los diagramas cuentan con imágenes en la web y archivos editables de Draw.io en sus respectivas carpetas. El [prototipo de interfaz](Documentacion/Planificacion/P10_Diseno_de_interfaz/prototipo.html) utiliza datos ficticios.

Los 12 pasos de planificación están documentados. El sistema conectado a la base de datos y sus pruebas de aceptación corresponden a la siguiente etapa de construcción.

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
