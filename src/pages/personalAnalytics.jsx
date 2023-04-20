import { MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import Link from "next/link";

export default function PersonalAnalytics(){


    const page_name = "analysis";

    return (

        <> 

          <MDBContainer>
            <MDBRow className="text-center p-3 text-muted">
                <MDBTypography variant="h5"> Work in Progress 📈 </MDBTypography>
                <MDBTypography variant="h5"> Meanwhile checkout our <Link href="chatAnalyzer">Chat Analysis</Link> or <Link href="/courses"> Courses</Link> or <Link href="/quiz/1">Quiz</Link> or <Link href="/erc/1">Expected Response Checker</Link> </MDBTypography>
            </MDBRow>

            <MDBRow className="text-center">
                <img src="/building.gif" style={{width:"40%"}} className="mx-auto"></img>
            </MDBRow>
            



          </MDBContainer>
         
        </>
    )
}