import {useLoaderData} from "react-router-dom";
import {MovieDetails} from "../components";


const MovieDetailsPage = () => {
    const {data} = useLoaderData();
    return (
        <div>
            <MovieDetails movie={data}/>
        </div>
    );
};

export {MovieDetailsPage};