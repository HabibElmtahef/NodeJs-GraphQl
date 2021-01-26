const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose')
const {MONGODB} = require('./config')
const Game = require('./models/Game')

const typeDefs = gql`
  type Game {
      _id: ID!
      title: String!
      desc: String!
      image: String!
  }

  type Query{
      sayHi: String!,
      getAllGames: [Game]
  }

  input GameInput{
      _id: String
      title: String
      desc: String
      image: String
  }

  type Mutation {
      addGame(input: GameInput): Game
      updateGame(_id: String, input: GameInput): Game
      deleteGame(_id: String): String!
  }
`

const resolvers = {
    Query: {
        sayHi: () => 'Ana Rah Khadam A Pfe',
        getAllGames: async() => {
            try {
                return await Game.find()
            } catch (error) {
                
            }
        }
    },
    Mutation: {
        async addGame(_, { input:{title, desc, image} }) {
            const game = await Game.findOne({title})
            if(game) throw new Error("Game Already Exist")
            const newGame = new Game({title, desc, image})
            return await Game.create(newGame)
        },

        async updateGame(_,{_id, input }){
            return await Game.findByIdAndUpdate({_id}, input, {new: true})
        },
        
        async deleteGame(_, {_id}) {
            await Game.findOneAndDelete({_id})
            return "Game Deleted"
        }
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Database Connected')
})

server.listen({port:5000}).then(res => {
    console.log(`Server Running at ${res.url}`)
})