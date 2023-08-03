import { ObjectId } from "mongodb";

const Usuarios = [{
    id: new ObjectId(),
    name: "Lautaro",
    surname: "Rocchi",
    email: "lautao.rocchi@davinci.edu.ar",
    password: PasswordPrompt(),
    brand: "Stack Ux",
    roles: [{
        rol: "admin",
        db: "Roles"
    }]
}]

const Roles = [{
    id: new ObjectId(),
    rol: "admin",
},
{
    id: new ObjectId(),
    rol: "user"
}]

const Empresa = [
    {
        id: new ObjectId(),
        name: 'Stack Ux',
        img: 'img/logo.png',
        descripcion: 'La empresa desarroladora de el sistema',
        localidad: 'San Justo',
        usuarios_id: [
            new ObjectId(),
            new ObjectId()
        ],
        dataEmpresa: [{
            tipo: ObjectId(),
            rubro: ObjectId(),
        }]
    }
]

const Productos = [
    {
        id: new ObjectId(),
        name: 'Motor V8',
        descripcion: 'Motor de un audi',
        categoria: 'San Justo',
        empresa_id: {
            _id: ObjectId(),
        }
    }
]

const Pedidos = [
    {
        id: new ObjectId(),
        title: 'Stack Ux',
        descripcion: 'La empresa desarroladora de el sistema',
        usuario_id,
        empresa_id,
        productos: [{
            producto_id: ObjectId(),
            cantidad: '100'
        }
        ],
    }
]

const TiposDeEmpresa = [
    {
        id: new ObjectId(),
        tipo: [
            {
                id: new ObjectId(),
                empresa: "Sociedad Anónima",
            },
            {
                id: new ObjectId(),
                empresa: "Responsabilidad Limitada",
            },
            {
                id: new ObjectId(),
                empresa: "Empresa Colectiva",
            },
            {
                id: new ObjectId(),
                empresa: "Empresa Cooperativa",
            },
            {
                id: new ObjectId(),
                empresa: "Empresa de Acción Simplificada",
            },
            {
                id: new ObjectId(),
                empresa: "Empresa Comanditaria",
            },
        ],
        rubros: [
            {
                id: ObjectId(),
                empresa: "Sector Primario. Agricultura, ganadería, pesca y minería",
            },
            {
                id: ObjectId(),
                empresa: "Sector Secundario (industrial). Empresas dedicadas a la industria y la construcción",
            },
            {
                id: ObjectId(),
                empresa: "Sector Terciario (Servicios)",
            },
        ],
        subrubro: [{

        }]
    }
]

const Ejemplo = [
    {
        title: "Jurassic World: Fallen Kingdom",
        genres: ["Action", "Sci-Fi"],
        runtime: 130,
        rated: "PG-13",
        year: 2018,
        directors: ["J. A. Bayona"],
        cast: ["Chris Pratt", "Bryce Dallas Howard", "Rafe Spall"],
        type: "movie"
    },
    {
        title: "Tag",
        genres: ["Comedy", "Action"],
        runtime: 105,
        rated: "R",
        year: 2018,
        directors: ["Jeff Tomsic"],
        cast: ["Annabelle Wallis", "Jeremy Renner", "Jon Hamm"],
        type: "movie"
    }
]


const ejemplo2 = [{
    id: new ObjectId(),
    name: 'Stack Ux',
    img: 'img/logo.png',
    descripcion: 'La empresa desarroladora de el sistema',
    localidad: 'San Justo',
    usuarios_id: [{
        _id: {
            $oid: "63fd8b9574a2dfa2da767f03"
        },
    }
    ],
    dataEmpresa: [{
            rubro: {
              $oid: "6413e6f642be2a41fe490fed"
        },
        subrubro: {
                "$oid": "6413e6f642be2a41fe490ff2"
        }
    }]
}]
   