//the home page - welcomes user and has the start reading button
// hi y/n(if signed in), think of a question, set your intentions, and choose your reading type(?)
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap: 45px;
//     min-height: 100vh;
//     width: 100vw;
//    //margin-top: 40px;
// `;

// const Content = styled.div`
//     display: flex;
//     width: 100%;

//     @media (max-width: 888px) {
//         flex-direction: column;
//         align-items: center;
//     }
// `;

// const KippyBlock = styled.div`
//     display: flex;
//     flex: 1;
//     justify-content: center;
//     background: black;
//     height: 550px;
//     margin: 40px;

//     @media (max-width: 888px) {
//         order: -1;
//         width: 550px;
//         height: 200px;
//         padding-top: 40px;
//         padding-bottom: 40px;
//     }
// `;

// const Text = styled.div`
//     //align-items: center;
//     //text-align: center;
//     //background-color: white;
//     //background-color: rgba(255, 255, 255, 0.65);
//     //border-radius: 12px;
//     //width: 550px;
//     //height: 100px;
//     //padding: 10px;
//    // color: black;
//     //font-weight: 420;
// `;

// const Container = styled.div`
//     //flex: 2;
//     //display: flex;
//     //flex-direction: column;
//     //align-items: center;
//     //justify-content: center;
//     //gap: 50px;
//     //padding: 10px;
// `;

// const ReadingOptions = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 40px;
//     padding-bottom: 20px;
// `;

// const ReadingButtons = styled.button`
//     //background-color: rgba(255, 255, 255, 0.75);
//     //color: black;
//     //font-size: 1em;
//     //outline: none;
//     //border: 2px solid transparent;
//     //outline: none;
//     //height: 55px;
//     //width: 200px;
//     //box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
//     &:hover {
//         //border: 2px solid rgba(104, 20, 138, 0.66); 
//         //color: rgba(104, 20, 138, 0.66);
//     }
//     &:focus {
//         //border: 2px solid rgba(104, 20, 138, 0.66); 
//         //outline: none;
//     }
// `;

// const Navigate = styled(Link)`
//     color: black;
//     &:hover {
//         background: none;
//         color: rgba(104, 20, 138, 0.66);
//     }
// `;

function Home() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            //wrapper
            <div className="flex flex-col justify-center items-center gap-[45px] min-h-screen w-screen">
                <div>is Loading</div>
            </div>
        )
    }

    return (
        //wrapper
        <div className="flex flex-col justify-center items-center gap-[45px] min-h-screen w-screen">
            {/* content */}
            <div className="flex w-full [@media(max-width:888px)]:flex-col [@media(max-width:888px)]:items-center">
                {/* kippy block */}
                <div className="flex flex-1 justify-center bg-black h-[550px] m-[40px] [@media(max-width:888px)]:-order-1 [@media(max-width:888px)]:w-[550px] [@media(max-width:888px)]:h-[200px] [@media(max-width:888px)]:pt-[40px] [@media(max-width:888px)]:pb-[40px]">
                    <p>meow its me kippy</p>
                </div>
                {/* container */}
                <div className="flex flex-2 flex-col items-center justify-center gap-[50px] p-[10px]">
                    {/* text */}
                    <div className="items-center text-center bg-panel rounded-panel w-[550px] h-[100px] p-[10px] text-black font-[420]">
                        <p>Hi {user?.displayName || "Friend"}!</p>
                        <p>Think of a question, set your intentions, and choose a reading!</p>
                    </div>
                    {/* reading options */}
                    <div className="flex flex-col items-center justify-center gap-[40px] pb-[20px]">
                        {/* navigate */}
                        <Link to='/Reading' className="text-black hover:bg-none hover:text-accent">
                            {/* reading buttons */}
                            <button className="bg-control text-black text-[1em] outline-none border-2 border-solid border-transparent h-[55px] w-[200px] shadow-surface hover:border-2 hover:border-solid hover:border-accent hover:text-accent focus:border-2 focus:border-solid focus:border-accent focus:outline-none">
                                General
                            </button>
                        </Link>

                        {/* <ReadingButtons>
                            Love - tbd
                        </ReadingButtons>

                        <ReadingButtons>
                            Career - tbd
                        </ReadingButtons> */}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;