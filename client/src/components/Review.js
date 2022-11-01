import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useParams } from 'react-router-dom';
import { useAddReview } from '../redux/actions/review/useAddReview';
import { useGetReview } from '../redux/actions/review/useGetReview';
import Comment from './Comment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { CircularProgress } from '@mui/material';
import {FaStar} from "react-icons/fa"
import { toast } from 'react-toastify'
import "./css/review.css"


const Review = ({title}) => {

    const {reviewReducer,userReducer} = useSelector(state => state)
    const RATE = [1,2,3,4,5]
    const dispatch = useDispatch()
    const {id} = useParams()
    const { addReview } = useAddReview()
    const {getReviewsByDishId} = useGetReview()
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(1)
    const [reviewType, setReviewType] = useState("Dining")
    const [reviewsLength, setReviewsLength] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    let user = userReducer.user
    let token = userReducer.token

    //? get the input data
    let reviewData = {
        userId: user ? user.userId : "",
        dishId: id,
        review: review,
        reviewType: reviewType,
        rating: rating,
        userName: user ? user.name : "",
    }

    // * add review & get review
    const handleReview = (e) => {
        e.preventDefault()
        if(review.length === 0){
            toast.error("Add a Review",{autoClose: 2000})
        }else{
            if(token){
                dispatch(addReview(reviewData))  //? add review function
                setReview("")
                setRating(1)
                setReviewType("Dinning")
            }else{
                toast.error("Login First",{autoClose: 2000})
            }
        }
    }

    const readMore = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setReviewsLength(reviewsLength + reviewsLength)
        }, 500);
    }

    const sliceReviews = reviewReducer.reviews.slice(0, reviewsLength)

    useEffect(() => {
        dispatch(getReviewsByDishId())
    },[id])


  return (
    <div className="dish-review-page">
        <div className='dish-review-text'>Reviews</div>
        <div className="dish-add-review-text">Rate your experience for</div>

        {/* review add component  */}
           <form className='review-form' onSubmit={handleReview}>
                <div className="dish-add-review-comp">
                    <div className="dish-add-rev-c1">
                    <div className="dish-add-rev-inp">
                        <input type="text" placeholder='Add a Review' className='user-rev-inp' name='review' value={review} onChange={(e) => setReview(e.target.value)} />
                    </div>
                    <div className="dish-add-rev-options">
                        <div className="dish-add-rev-opt1" id='dishAddRevOpt1'>
                        <h1>Choose</h1>
                        <FormControl>
                            <RadioGroup row defaultValue="Dining" aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                <FormControlLabel style={{color: "whiteSmoke"}} control={<Radio />} label="Dining" name="type" value="Dining" onClick={() => setReviewType("Dinning")} />
                                <FormControlLabel style={{color: "whiteSmoke"}} control={<Radio />} label="Delivery" name="type" value="Delivery" onClick={() => setReviewType("Delivery")}/>
                            </RadioGroup>
                        </FormControl>
                        </div>
                        <div className="dish-add-rev-opt1">
                            <h1>Rate</h1>
                            {
                                RATE.map((elem) => {
                                    return <button className={elem === rating ? "dish-add-rev-rating rate" : "dish-add-rev-rating"} name='rating' key={elem} type="button" onClick={() => setRating(elem)}><p>{elem}</p><FaStar style={{color:"orange", fontSize:"1.3em"}} /></button>                                  
                                })
                            }           
                        </div>
                    </div>
                    </div>

                    <div className="dish-add-rev-c2">
                        <button className='add-rev-btn' type='submit'>ADD</button>
                    </div>
                </div>
            </form>

        {/* show reviews component */}
            <div className="dish-show-review-comp">
                <div className='dish-show-rev-for'>{title} Reviews</div>
                <ul className='dish-show-review-comp-ul'>
                    {
                        reviewReducer.reviews.length !== 0 ? 
                           sliceReviews && sliceReviews.map((review) => {
                                return <li className='dish-show-review-comp-li' key={review._id}><Comment key={review._id} dishId={id} review={review} comments={review.comments} userId={user ? user.userId : ""} userName={user ? user.name : ""} likes={review.likes} /></li>
                            })
                        :
                        <p className='no-review-msg'>No Reviews</p>
                    }
                </ul>
            </div>

            {/* Read more Reviews button */}

           {
                reviewReducer.reviews.length <= 3 ? 
                    null
                    :
                        reviewReducer.reviews.length <= reviewsLength ? 
                            <button className='read-more-reviews-btn' onClick={() => setReviewsLength(3)}>Hide Reviews</button>
                            :
                            <button className='read-more-reviews-btn' onClick={() => readMore()}>
                                {
                                    isLoading === true ? 
                                        <CircularProgress/>
                                        :
                                        "Read More"
                                }
                            </button>
            }
    </div>
  )
}

export default Review