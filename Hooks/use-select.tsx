import { ChangeEvent, useState } from "react"

const useSelect = (validator:(inputVale: string | number) => boolean) => {
    const [inputValue, setInputValue] = useState('')
    const [inputTouched, setInputTouched] = useState(false)
    const isInputValid = validator(inputValue)
    const hasError = !isInputValid && inputTouched

    const valueChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setInputValue(event.target.value)
    }

    const inputBlurHandler = () => {
        setInputTouched(true)
    }

    const reset = () => {
        setInputValue('')
        setInputTouched(false)
    }

    return {
        inputValue,
        isInputValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
        setInputValue,
    }
}

export default useSelect