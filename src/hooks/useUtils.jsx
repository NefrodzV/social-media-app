export default function useUtils() {
    function formatFullname(user) {
        return user.firstName + ' ' + user.lastName
    }

    return { formatFullname }
}
