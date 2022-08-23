import { useState } from 'react'

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm)

    const onInputChange = ({ target }) => {

        const { name, value } = target
        setFormState(current => {
            return {
                ...current,
                [name]: value
            }
        })
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
}