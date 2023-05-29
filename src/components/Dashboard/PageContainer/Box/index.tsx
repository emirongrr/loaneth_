
const InfoBox = () =>
{
    return(
        <div>
            <div className="flex justify-between items-center"></div>
            <div className="h-[48px] w-auto"></div>
            <div  className="p-[24px 24px 0px] shadow-elevation-100 rounded-[12px]  border-neutral-300">
                <a>
                    <div className="grid grid-flow-col auto-cols-new gap-[12px] items-center justify-start">
                        <div className="grid grid-flow-col auto-cols-new gap-[30px] items-center justify-start">
                        <div className="flex flex-col bg-opacity-50 backdrop-filter shadow-2xl backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300 w-[300px]"/>
                        <div className="flex flex-col bg-opacity-50 backdrop-filter shadow-2xl backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300 w-[300px]"/>
                        <div className="flex flex-col bg-opacity-50 backdrop-filter shadow-2xl backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300 w-[300px]"/>
                        </div>
                    </div>
                </a>
                <div className="h-6 w-auto"></div>
                <div className="asset"></div>

            </div>
        </div>
    );
}

export default InfoBox