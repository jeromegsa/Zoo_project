import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchEspeces } from "../../features/espece/EspeceSlice"
export default function Espece() {
    const dispatch = useDispatch()
    const especes = useSelector(state => state.especes)
    const { espece, isLoading, error } = useSelector((state) => state.especes)
    useEffect(() => {
        dispatch(fetchEspeces())
    }, [dispatch])

    if (isLoading) return <p>Chargement...</p>
    if (error) return <p> Erreur : {error}</p>
    return (
        <ul>
            {espece?.map((e) => {

                <li key={e.id}> {e.nom}</li>
            })}
        </ul>
    )
}
