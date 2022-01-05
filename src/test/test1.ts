export {}

export type companies = {
    id: number
    title: string
}

export type UserType = {
    name: string
    hair: number
    address: {
        city: string
        house: number
    }
    companies: Array<companies>
}

export type UserTypeWithLaptop = UserType & {
    laptop: {
        title: string
    }
}


export type UserWithBooks = UserType & {
    books: Array<string>
}


export const upgradeUserLaptop = (user:UserTypeWithLaptop, title: string) => {
    return {
        ...user,
        laptop: {
            ...user.laptop,
            title: title
        }
    }
}


export const addBooksToUser = (user:UserWithBooks & UserTypeWithLaptop, arrayBook:Array<string>) => {
    return {
        ...user,
        books: user.books.concat(arrayBook)
    }
}

export const updateBook = (user:UserWithBooks & UserTypeWithLaptop, old: string, newB: string) => {
    return {
        ...user,
        books: user.books.map(b => b === old ? newB : b)
    }
}

export const updateCompanies = (user: UserWithBooks & UserTypeWithLaptop, idCom:number, val: string) => {
    return {
        ...user,
        companies: user.companies.map((c:companies) => c.id === idCom ? {...c, title:val} : c)
    }
}