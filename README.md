# Microservicio NEXO ParametricoFacturador

Este microservicio tiene como objetivo principal recuperar la información paramétrica de tres tablas almacenadas en una base de datos MySQL. A continuación se detallan las características y requisitos del microservicio:

## Funcionalidades

- **Recuperación de Información Paramétrica**: El microservicio proporciona la funcionalidad de recuperar la información paramétrica definida en tres tablas de una base de datos MySQL.

## Restricciones

- **Restricción de Escritura**: Por razones de logística, se ha establecido que el microservicio no puede realizar ninguna operación de escritura en la base de datos MySQL. Esto incluye tanto operaciones realizadas a través de un cliente de base de datos como mediante código. Cualquier incumplimiento de esta restricción resultará en una calificación de 0 para el ejercicio.

## Requisitos

- **Métodos de Consulta**: El microservicio debe ofrecer todos los métodos de consulta necesarios para sus posibles consumidores, ya sea el Frontal u otro Microservicio.

- **Flexibilidad en el Modelado de Datos**: Se proporcionará un modelado de datos ya realizado para el ejercicio. La aplicación debe ser lo suficientemente flexible para adaptarse a posibles cambios en los valores de los datos sin afectar su funcionalidad.

## Tecnología Utilizada


- **Express**: Se utiliza el framework Express para crear el servidor y definir las rutas de la API.
- **Sequelize**: Se utiliza Sequelize como ORM para interactuar con la base de datos.
- **CORS Middleware**: Se habilita el middleware CORS para permitir solicitudes desde cualquier origen.
- **Controladores de Métodos de Pago, Periodos y Suscripciones**: Se definen varios controladores para manejar las solicitudes relacionadas con la obtención de métodos de pago, periodos y suscripciones.
- **Conexión a la Base de Datos**: Se establece la conexión a la base de datos mediante Sequelize.
- **Puerto de Escucha**: El servidor escucha en el puerto 8084.

## Endpoints Disponibles

- **GET /paymentMethods**: Obtiene todos los métodos de pago.
- **GET /periods**: Obtiene todos los periodos.
- **GET /subscribtions**: Obtiene todas las suscripciones.
- **GET /subscribtionsByPaymentMethod/:id**: Obtiene las suscripciones asociadas a un método de pago específico.
- **GET /subscribtionsByNumOfRequest/:request**: Obtiene las suscripciones con un número mínimo de peticiones.
- **GET /periodsByDatesAvailable/:date**: Obtiene los periodos disponibles para una fecha específica.


## Equipo

- Marcelo Herce (Desarrollador Backend)
- Pablo López (Desarrollador Frontend)
- Antonio Jurado (Scrum Master)

