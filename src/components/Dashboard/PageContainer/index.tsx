import InfoBox from "./Box";
import ChartSection from "./PerformanceAndAssetChart";


const PageBody = () => {
    
    return(
        <div className="mx-auto px-[15p] w-full max-w-[960px] flex-grow">
            <div className="h-6 w-auto"></div>
                <div className="grid gap-30 grid-cols-new">
                <ChartSection/>
                <InfoBox/>
                </div>
        </div>
    
    );
    
}

export default PageBody