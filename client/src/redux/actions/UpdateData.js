export const UpdateData = (reviews, id, review) => {
    const newReview = reviews.map(item => 
        (item._id === id ? review : item)
    )
    return newReview;
}