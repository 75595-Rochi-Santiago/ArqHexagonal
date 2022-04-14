import { UserCreatorUseCase } from '../../../application/usecases/User/UserCreator'
// import { InMemoryUserRepository } from '../../implementations/inMemory/inMemoryUserRepository'
import { User } from '../../../domain/entities/User'
import { UserGetterUseCase } from '../../../application/usecases/User/UserGetter'
import { UserUpdaterUseCase } from '../../../application/usecases/User/UserUpdater'
import { UserDeleterUseCase } from '../../../application/usecases/User/UserDeleter'
import { MongoDB } from '../../driven-adapters/MongoDB/index'
import { MongoDBUserRepository } from '../../implementations/MongoDB/MongoDBUserRepository';
(async () => {
  try {
    const db = new MongoDB()
    await db.connectDB()
    const mongoDBUserRepository = new MongoDBUserRepository()
    // crear usuario
    const userCreatorUseCase = new UserCreatorUseCase(mongoDBUserRepository)
    const userToCreate: User = {
      name: 'santi',
      username: 'bang',
      id: '7'
    }
    const created = await userCreatorUseCase.run(userToCreate)
    console.log('Usuario creado: ', created)
    // obtener usuarios
    const userGetterUseCase = new UserGetterUseCase(mongoDBUserRepository)
    const usersReturned = await userGetterUseCase.run()
    console.log('Usuarios obtenidos: ', usersReturned)

    // actualizar usuarios
    const userUpdaterUseCase = new UserUpdaterUseCase(mongoDBUserRepository)
    const actualized = await userUpdaterUseCase.run({
      id: '7',
      username: 'username actualizado'
    })
    console.log('actualized:', actualized)
    const usersReturned2 = await userGetterUseCase.run()
    console.log('Usuarios despues de actualizar: ', usersReturned2)
    // eliminar usuario
    const userDeleterUseCase = new UserDeleterUseCase(mongoDBUserRepository)
    await userDeleterUseCase.run('7')
    const usersReturned3 = await userGetterUseCase.run()
    console.log('Usuarios despues de eliminar:', usersReturned3)
  } catch (error) {
    console.log(error)
  }
})()
