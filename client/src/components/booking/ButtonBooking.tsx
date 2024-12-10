import { Button } from "../../styles/components/ui/button"

export default function ButtonBooking({ title, onClick }) {
    return <Button onClick={onClick}>{title}</Button>
}
