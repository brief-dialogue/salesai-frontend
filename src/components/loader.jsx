import { MDBSpinner } from "mdb-react-ui-kit";

export default function Loader() {

    return (
        <MDBSpinner grow color='primary'>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    )
}