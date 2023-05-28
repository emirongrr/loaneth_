import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';


const AssetsList = () =>
{
    return(
        <div>
            <div className="flex justify-between items-center"></div>
            <div className="h-[8px] w-auto"></div>
            <div  className="p-[24px 24px 0px] shadow-elevation-100 rounded-[12px] border border-neutral-300">
                <a>
                    <div className="grid grid-flow-col auto-cols-new gap-[12px] items-center justify-start">
                        <div className="grid grid-flow-col auto-cols-new gap-[4px] items-center justify-start">
                      
                        </div>
                    </div>
                </a>
                <div className="h-6 w-auto"></div>
                <div className="asset"></div>

            </div>
        </div>
    );
}

export default AssetsList