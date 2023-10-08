function Arrow(direction: string) {

    return (
        direction === "right"
            ? (
                <div className="nav__button prev">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15 3l-9 9 9 9"></path>
                    </svg>
                </div>
            )
            : (        
                <div className="nav__button next">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M9 3l9 9-9 9"></path>
                    </svg>
                </div>
            )
        
    )
}

export default Arrow