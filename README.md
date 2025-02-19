<div>
  <div>   
    <img src="" alt="banner" />
  <div />

  <div align="center">
    <img src="https://img.shields.io/badge/-graphql-black?style=for-the-badge&logoColor=white&logo=graphql&color=E10098" alt="graphql" />
    <img src="https://img.shields.io/badge/-node_js-black?style=for-the-badge&logoColor=white&logo=nodedotjs&color=5FA04E" alt="nodedotjs" />
    <img src="https://img.shields.io/badge/-express-black?style=for-the-badge&logoColor=white&logo=express&color=000000" alt="express" />
    <img src="https://img.shields.io/badge/-apollo_server-black?style=for-the-badge&logoColor=white&logo=apollographql&color=311C87" alt="apollographql" />
    <img src="https://img.shields.io/badge/-postgresql-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
    <img src="https://img.shields.io/badge/-xampp-black?style=for-the-badge&logoColor=white&logo=xampp&color=FB7A24" alt="xampp" />
    <img src="https://img.shields.io/badge/-wordpress-black?style=for-the-badge&logoColor=white&logo=wordpress&color=21759B" alt="wordpress" />
    <img src="https://img.shields.io/badge/-woocommerce-black?style=for-the-badge&logoColor=white&logo=woocommerce&color=96588A" alt="woocommerce" />
  </div>

<h3 align="center">e-Commerce API GraphQL</h3>

   <div align="center">
     API created with apollo server + express + nodeJS, which allows us to connect to Wordpress as a content manager and perform virtually all the usual functions of an online shop.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

* [1. Configuring XAMPP](#1)
* [2. Configuring WORDPRESS locally](#2)
  - [2.1. Data for DB Configuration](#21)
  - [2.2. Configure WOOCOMMERCE](#23)
* [3. Environment Variables Configuration](#3)
* [4. POSTGRESQL installation](#4)
* [5. DBEAVER Installation](#5)
* [6. Starting the Server locally](#6)

## **1. Configuring XAMPP** <div id="1"/>

Install XAMPP [https://www.apachefriends.org/es/index.html](https://www.apachefriends.org/es/index.html)

Start Apache Server on XAMPP

Start MySQL Server on XAMPP

Create Database with PHPMyAdmin on XAMPP

```
NOMBRE DE BASE DE DATOS: "oberon-lambda"
```

## 2. **Configuring WORDPRESS locally** <div id="2"/>

Download Wordpres [https://es.wordpress.org/](https://es.wordpress.org/)

Create a folder in /xamp/htdocs/ named hermenautas

Extract Wordpress files into the /xamp/htdocs/hermenautas folder.

Proceed to install Wordpress by going to [http://localhost/hermenautas](http://localhost/hermenautas)

### 2.1. **Data for DB Configuration** <div id="21"/>

```
Database name = ‘oberon-lambda’.

Username = ‘root

Password = null

Database server = ‘localhost

Table prefix = wp\_
```

### 2.2. **Configure WOOCOMMERCE** <div id="23"/>

Go to WooCommerce > Settings > Advanced > Generate API Key

Get Customer Key

Get Customer Secret Key

## 3. **Environment Variables Configuration** <div id="3"/>

Save all these variables in an .env file and place it in the root directory where you are hosted in the Backend

```bash
## APOLLO SERVER CONFIG

PORT_DEV = 4000
PROD_URL = "https://example.com"

## APOLLO ROVER CONIFG

APOLLO_TELEMETRY_DISABLED = 1

## POSTGRESQL CONFIG DEVELOPMENT

USERNAME_POSTGRESQL = 'admin'

PASSWORD_POSTGRESQL = ''

DATABASE_POSTGRESQL = 'test-user'

HOST_POSTGRESQL = 'localhost'

DIALECT_POSTGRESQL = 'postgres'

## MYSQL CONFIG DEVELOPMENT

MYSQL_HOST = 'localhost'

MYSQL_USER = 'root'

MYSQL_PASSWORD = null

MYSQL_DATABASE = ""

## KEY PASETO

SECRET_KEY = ''

PUBLIC_KEY = ''

## WOOCOMMERCE

WOO_CONSUMER_KEY_DEV = ""

WOO_CONSUMER_SECRET_DEV = ""
```

This API uses the PASETO system, generate your own keys by following the instructions in the following documentation:
- [Paseto npm](https://www.npmjs.com/package/paseto)
- [Paseto usage examples](https://pyseto.readthedocs.io/en/latest/paseto_usage.html)


## 4. **POSTGRESQL installation** <div id="4"/>

Download and Install PostgreSQL [https://www.postgresql.org/](https://www.postgresql.org/)

Set SuperUser password

Login to PgAdmin 4

Enter SuperUser password

Create Database named test-user and Assign admin as owner of test-user

## 5. **Instalación DBEAVER** <div id="5"/>

Install DBeaver [https://dbeaver.io/](https://dbeaver.io/)

Access the program and make a new connection by inserting the following data:

```
Connect by: Host

Host: localhost

Port: 5432

Database: test-user

Authentication: Database Native

Username: admin

password: 

check en save password locally
```

## 6. **Starting the Server locally** <div id="6"/>

Starting the Apache XAMPP server

Start the MySQL XAMPP server

Verify that the PostgreSQL server is active

Open terminal inside root folder of API and then execute the following command:

```bash
npm start
```

Check if the tables load

Check if Apollo Server loads on port 4000
