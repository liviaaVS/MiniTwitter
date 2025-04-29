```mermaid
   erDiagram
    USUARIO ||--o{ POSTAGEM : cria
    USUARIO ||--o{ CURTIDA : faz
    POSTAGEM ||--o{ CURTIDA : recebe
    USUARIO ||--o{ SEGUIDOR : segue
    USUARIO ||--o{ SEGUIDOR : é_seguido

    USUARIO {
        int id PK
        string email
        string nome_usuario
        string senha_hash
        datetime data_criacao
    }

    POSTAGEM {
        int id PK
        int autor_id FK
        string texto
        string imagem_url
        datetime data_criacao
    }

    CURTIDA {
        int id PK
        int usuario_id FK
        int postagem_id FK
        datetime data_curtida
    }

    SEGUIDOR {
        int id PK
        int seguidor_id FK
        int seguido_id FK
        datetime data_seguimento
    }
```


ENV: 
```bash	
DJANGO_SECRET_KEY="django-insecure-iy_lt*++uq##zoe0_^=5lem@6$nn^66xpei&ehre%e7f3wmkzh"
DEBUG=True
DJANGO_LOGLEVEL=info
DJANGO_ALLOWED_HOSTS=localhost
DATABASE_ENGINE=postgresql
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_HOST=db
DATABASE_PORT=5432
```