import React from 'react';
import SmallButton from '../components/small-button'; 
import { exportExcel } from '../services/exportExcel'; 

export default function Responses({ data }) {
  const commonClass = "opacity-80 mt-2!";
  return (
    <div className="bg-white p-6 max-w-4xl mx-auto">
      <h1 className='text-2xl font-bold mb-6! mt-2!'>Report Details :</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Business Idea</h4>
          <p className={commonClass}>{data.businessIdea}</p>
        </div>
        <div>
          <h4 className="font-semibold">Stage of Business</h4>
          <p className={commonClass}>{data.stageOfBusiness}</p>
        </div>
        <div>
          <h4 className="font-semibold">Target Market</h4>
          <p className={commonClass}>{data.targetMarket}</p>
        </div>
        <div>
          <h4 className="font-semibold">Monthly Budget</h4>
          <p className={commonClass}>${data.monthlyBudget}</p>
        </div>
        <div>
          <h4 className="font-semibold">Main Goal</h4>
          <p className={commonClass}>{data.mainGoal}</p>
        </div>
      </div>
      <hr className='opacity-20 mt-4 mb-4' />
      <div className="mt-6 space-y-4">
        <div>
          <h4 className="font-semibold">Business Overview</h4>
          <p className={commonClass}>{data.businessOverview}</p>
        </div>
        <div>
          <h4 className="font-semibold">Industry Analysis</h4>
          <p className={commonClass}>{data.industryAnalysis}</p>
        </div>
        <div>
          <h4 className="font-semibold">Competitor Insights</h4>
          <p className={commonClass}>{data.competitorInsights}</p>
        </div>
        <hr className='opacity-20 mt-4 mb-4' />
        <div>
          <h4 className="font-semibold">Location Recommendation</h4>
          <p className={commonClass}>{data.locationRecommendation}</p>
        </div>
        <div>
          <h4 className="font-semibold">Target Audience</h4>
          <p className={commonClass}>{data.targetAudienceDefinition}</p>
        </div>
        <div>
          <h4 className="font-semibold">Marketing Suggestions</h4>
          <p className={commonClass}>{data.marketingSuggestions}</p>
        </div>
        <div>
          <h4 className="font-semibold">Operations Advice</h4>
          <p className={commonClass}>{data.operationsAdvice}</p>
        </div>
        <div>
          <h4 className="font-semibold">Legal Considerations</h4>
          <p className={commonClass}>{data.legalConsiderations}</p>
        </div>
        <hr className='opacity-20 mt-4 mb-4' />
        <div>
          <h4 className="font-semibold">Growth Strategy</h4>
          <p className={commonClass}>{data.growthStrategy}</p>
        </div>
        <div>
          <h4 className="font-semibold">Common Pitfalls</h4>
          <p className={commonClass}>{data.commonPitfalls}</p>
        </div>
        <div>
          <h4 className="font-semibold">Summary Recommendation</h4>
          <p className={commonClass}>{data.summaryRecommendation}</p>
        </div>
      </div>
      <div className='mt-6'>   
        <SmallButton onClick={(e)=> {
                e.preventDefault();
                exportExcel([data]);
            }}
            name="Excel" style={'bg-secondary text-white!'}/>
      </div> 
                   
      <div className="text-sm text-gray-500 mt-6 text-right">
        Published At: {new Date(data.reportPublishedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
