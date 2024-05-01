export default function useLocalStorage() {
    const localStorage = window.localStorage

    const set = (key, val) => {
        localStorage.setItem(key, JSON.stringify(val))
    }
    const get = (key) => {
        return JSON.parse(localStorage.getItem(key))
    }

    const remove = (key) => {
        localStorage.removeItem(key)
    }
    return { set, get, remove }
}
