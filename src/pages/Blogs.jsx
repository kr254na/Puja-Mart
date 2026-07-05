import BlogSystem from "../components/BlogSystem";

export default function Blogs(){
    return(
      <div className="page-container-listing">
        <BlogSystem isHomePage={false}/>
      </div>
    );
}