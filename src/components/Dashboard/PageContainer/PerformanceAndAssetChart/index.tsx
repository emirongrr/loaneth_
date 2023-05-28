

const ChartSection = () =>
{
    return(
        <div className="grid grid-flow-col auto-cols-new gap-[30px] grid-cols-[1fr,300px] items-initial justify-initial">
            <div className="grid gap-[12px] grid-cols-new">
                <div className="grid grid-flow-col auto-cols-new gap-[8px] items-end">
                    <div className="block font-graphik text-24 leading-28 font-medium tracking-normal text-current">Performance</div>
                </div>
                <span>
                    <div className="flex flex-col h-[340px] justify-between p-[16px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300">
                        <div className="chart"></div>
                    </div>
                </span>


            </div>


            <div className="grid gap-[12px] grid-cols-new1">
                <div className="block font-graphik text-24 leading-28 font-medium tracking-normal text-current">Assets</div>
                <span>
                <div className="flex flex-col h-[340px] justify-between p-[16px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300">
                        <div className="chart"></div></div>
                </span>
            </div>

        </div>
    );
}

export default ChartSection