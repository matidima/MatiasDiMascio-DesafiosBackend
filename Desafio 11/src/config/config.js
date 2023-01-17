const config = {
    SERVER:{
        PORT: process.env.PORT || 8080
    },
    DATABASE: {
        mongo: {
            dburl: `mongodb+srv://matidima:HNIlXZrVnoqCt8Rx@cluster0.7ujig2q.mongodb.net/?retryWrites=true&w=majority`,
            dbName: `backend`
        }
    }
}

export { config }