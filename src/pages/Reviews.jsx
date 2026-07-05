import ReviewSystem from "../components/ReviewSystem";

export default function Reviews(){
    return(
      <div className="page-container-listing">
        <ReviewSystem isHomePage={false}/>
      </div>
    );
}