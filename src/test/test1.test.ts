import {
    addBooksToUser,
    updateBook,
    updateCompanies,
    upgradeUserLaptop,
    UserTypeWithLaptop,
    UserWithBooks
} from "./test1";

export {}

const userInit: UserWithBooks & UserTypeWithLaptop = {
    name: 'first',
    hair: 32,
    address: {
        city: 'izh',
        house: 10
    },
    laptop: {
        title: 'lenovo'
    },
    books: ['css','html','js','react'],
    companies: [
        {id: 1, title: 'Епам'},
        {id: 2, title: 'IT-INCUBATOR'}
    ]
}


test('upgrade laptop for user', () => {
    let user: UserWithBooks & UserTypeWithLaptop = userInit

    const userWithMacbook = upgradeUserLaptop(user, 'Macbook')

    expect(user).not.toBe(userWithMacbook)
    expect(user.laptop).not.toBe(userWithMacbook.laptop)
    expect(user.address).toBe(userWithMacbook.address)
    expect(userWithMacbook.laptop.title).toBe('Macbook')
    expect(user.laptop.title).toBe('lenovo')

})
test('user with book', () => {
    let user: UserWithBooks & UserTypeWithLaptop = userInit

    const userCopy = updateBook(user, 'js','ts')

    expect(user).not.toBe(userCopy)
    expect(user.laptop).toBe(userCopy.laptop)
    expect(user.address).toBe(userCopy.address)
    expect(user.books).not.toBe(userCopy.books)
    expect(userCopy.books[2]).toBe('ts')

})

test('user with companies', () => {
    let user: UserWithBooks & UserTypeWithLaptop = userInit

    const userCopy = updateCompanies(user, 1,'EPAM')


    expect(user).not.toBe(userCopy)
    expect(user.address).toBe(userCopy.address)
    expect(user.companies).not.toBe(userCopy.companies)
    expect(userCopy.companies[0].title).toBe('EPAM')

})

