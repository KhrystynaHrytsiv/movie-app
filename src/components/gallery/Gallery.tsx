import {useState} from 'react';
import {useAppSelector} from "../../hook/reduxHooks";
import {ArrowBackIosNew, ArrowForwardIos} from "@mui/icons-material";
import {poster} from "../../services";
import css from './Gallery.module.css'

const Gallery = () => {
    const [index, setIndex] = useState(0)
    const {images} = useAppSelector(state => state.movies);
    const maxIndex = images.slice(0, 8).length - 4

    const handleLeft =() =>{
        if(index > 0){
            setIndex(prev=> prev -1)
        }
    }
    const handleRight =() => {
        if (index < images.length -1) {
            setIndex(prev => prev + 1)
        }
    }
    return(
    <div className ={css.gallery}>
            {index > 0 && (<ArrowBackIosNew className={css.arrowL} onClick={handleLeft}/>)}
            <div className={css.inner} >
                {images.slice(0, 8).map((i) =>
                    <div key={i.id} className={css.imageContainer} style={{transform: `translateX(-${index * 100}%)`}}>
                    <img src={`${poster}/${i.file_path}`} alt={''} className={css.images}/>
                    </div>)}
            </div>
            {index < maxIndex && (<ArrowForwardIos className={css.arrowR} onClick={handleRight}/>)}
        </div>

    );
};

export {Gallery};