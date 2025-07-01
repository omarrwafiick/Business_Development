import React from 'react'
import SmallButton from './small-button';

export default function ApplicationOverview({data, onClick, seedData}) {
  return ( 
    <div onClick={onClick} className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4!">Business Summary</h2>
 
      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <span className="font-semibold">Business Idea:</span>
          <p className='mt-1!'>{data.businessIdea}</p>
        </div>

        <div>
          <span className="font-semibold">Stage of Business:</span>
          <p className='mt-1!'>{data.stageOfBusiness}</p>
        </div>

        <div>
          <span className="font-semibold">Target Market:</span>
          <p className='mt-1!'>{data.targetMarket}</p>
        </div>

        <div>
          <span className="font-semibold">Monthly Budget:</span>
          <p className='mt-1!'>${data.monthlyBudget}</p>
        </div>
      </div>

      <div className="text-right text-xs text-gray-500 mt-4">
         <SmallButton onClick={(e)=> {
                e.preventDefault();
                seedData(data);
            }} name="Read More" style={'bg-secondary text-white!'}/>
      </div>
    </div>
  );
}

