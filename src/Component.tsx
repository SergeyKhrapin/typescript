import React, { useState } from 'react'

/* GENERICS */

// 1. Array

const numberArray: Array<number> = [1, 2, 3]
const numberOrStringArray: Array<number | string> = [1, 2, 'a']

type Type =  number | string
const numberOrStringArray2: Array<Type> = [5, 'a']

type Type2 = Array<string>
const stringArray: Type2 = ['a', 'b']

console.log(numberArray, numberOrStringArray, numberOrStringArray2, stringArray)


// 2. 

// function declaration
function _getLastElement<T>(arr: T[]) {
    return arr[arr.length - 1]
}

// function expression
// use trailing comma to avoid the error "JSX element 'T' has no corresponding closing tag" (only in .tsx)
const getLastElement = <T,>(arr: T[]) => {
    return arr[arr.length - 1]
}

const last1 = getLastElement([1, 2, 3])
const last2 = getLastElement(['a', 'b', 'c'])
const last3 = getLastElement([1, 2, 'c'])
const last4 = getLastElement<string | number>([1, 2, 'c']) // we can explicitly specify the type

console.log(last1, last2, last3, last4)


// 3. two generics, return type, overwrite inference, default value

const makeArray = <X, Y = string>(x: X, y: Y): [X, Y] => {
    return [x, y] // returns a tuple
}

const arr1 = makeArray(5, 7)
const arr2 = makeArray('a', 'b')
const arr3 = makeArray(5, 'b')
const arr4 = makeArray<number | null, string>(null, 'b') // we can explicitly specify the type of arguments
const arr5 = makeArray<number | null>(null, 'b') // we can also explicitly specify only the type of the first argument
                                                 // the default type of the second argument is a string

console.log(arr1, arr2, arr3, arr4, arr5)


// 4. extends

const makeFullName = <T extends { firtsName: string, lastName: string }>(obj: T) => {
    return {
        ...obj,
        fullName: obj.firtsName + ' ' + obj.lastName
    }
}

const user = makeFullName({
    firtsName: 'Serhii',
    lastName: 'Khrapin',
    age: 35,
    sex: 'male'
})


// 5. generic + interface

interface Tab<T> {
    id: string
    position: number,
    data: T
}

type StringData = Tab<string>
type NumberData = Tab<number>

const tab1: StringData  = {
    id: '1320',
    position: 3,
    data: 'vsd'
}

const tab2: NumberData  = {
    id: '1320',
    position: 3,
    data: 5
}

console.log(tab1, tab2)


// 6. props

interface Props {
    title: string
}


// 7. useState takes a generic

// 8. JSX generic *

interface FormProps<T> {
    values: T
    children: (values: T) => JSX.Element
}

const Form = <T extends {}>({ values, children }: FormProps<T>) => {
    return (
        <form action="">
            { children(values) }
        </form>
    )
}


const Component: React.FC<Props> = ({ title }) => {
    const [ userName, setUserName ] = useState('Serhii')
    
    // we can't do this because userName's type is string
    // setUserName(5)
    
    // we can also explicitly specify the type
    // const [ userName, setUserName ] = useState<string>('Serhii')

    return (
        <>
            <div>
                { title }, { userName }
            </div>

            <p>* JSX generic</p>
            <div>
                <Form values={{ name: 'Petro' }} children={val => <p>{ val.name }</p>} />

                or

                <Form values={{ name: 'Petro' }}>
                    { val => <p>{ val.name }</p> }
                </Form>

                or we can explicitly override a type

                <Form<string> values={'Serhii'}>
                    { val => <p>{ val }</p> }
                </Form>
            </div>
        </>
    )
}

export default Component
