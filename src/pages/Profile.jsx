import { useContext } from 'react'
import { UserContext } from '../App'
import { Header, Loader, Navigation } from '../components'
import exampleUserImage from '../assets/example-user.jpg'
export default function Profile() {
    const { user } = useContext(UserContext)
    return (
        <div className="layout">
            {user ? (
                <>
                    <Header />
                    {/* <h1>Welcome {user?.fullname}</h1> */}
                    <Navigation />

                    <div>
                        <img
                            style={{ width: 200, aspectRatio: 1 }}
                            src={exampleUserImage}
                        />
                        <h2>{user?.fullname}</h2>
                    </div>
                    <h1>Followers</h1>
                    {/* <CreatePost /> */}
                </>
            ) : (
                <Loader width={16} height={16} borderWidth={4} />
            )}
        </div>
    )
}
