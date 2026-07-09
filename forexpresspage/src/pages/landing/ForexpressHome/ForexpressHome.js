import './ForexpressHome.css';

export default function ForexpressHome() {
    return (
        <div className="total">
            <h1 className="title">forexpress</h1>

            <div className="art-cont">
                <article>
                    <h1 className="sub-title">It just makes sense</h1>
                    <p className="sub-text">Using our product makes a lot of sense because we earn money when you use our product. This makes it easier for us to do things.</p>
                </article>
                <article>
                    <h1 className="sub-title">It costs nothing</h1>
                    <p className="sub-text">Our product is a demo. That means using it is completely free until it isn't. You trade with fake money.</p>  
                </article>
                <article>
                    <h1 className="sub-title">We don't sell your data</h1>
                    <p className="sub-text">When you use any of our products, you are given our absolute guarantee that we only sell half of your data to the government.</p>
                </article>
            </div>
        </div>
    );
}