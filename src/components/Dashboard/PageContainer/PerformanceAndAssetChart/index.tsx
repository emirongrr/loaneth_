
import Chart from "../Charts";
import { DonutChart } from "@tremor/react";

const ChartSection = () =>
{
    const Assets = [
        {
          name: "Altın",
          sales: 9800,
        },
        {
          name: "USD",
          sales: 4567,
        },
        {
          name: "TRY",
          sales: 3908,
        },
        {
          name: "EUR",
          sales: 2400,}]


    const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;
    return(
        <div className="grid grid-flow-col auto-cols-new gap-[30px] grid-cols-[1fr,300px] items-initial justify-initial">
            <div className="grid gap-[12px] grid-cols-new">
                <div className="grid grid-flow-col auto-cols-new gap-[8px] items-end">
                    <div className="block font-graphik text-[24px] text-black dark:text-white leading-28 font-medium tracking-normal ">Performance</div>
                </div>
                <span >
                    <div className="flex shadow-2xl flex-col h-[340px] justify-between p-[16px] shadow-elevation-100 rounded-[12px] border  border-neutral-300  ">
                        <Chart/>
                    </div>
                </span>


            </div>

            <div className="grid gap-[12px] grid-cols-new1">
                <div className="block font-graphik text-[24px] text-black dark:text-white leading-28 font-medium tracking-normal text-current">Assets</div>
                <span>
                    <div className="flex flex-col shadow-2xl h-[340px] justify-between p-[16px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300">
                    <DonutChart
            className="mt-12"
            data={Assets}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
          />
                        
                    </div>
                </span>
            </div>

        </div>


    );
}

export default ChartSection