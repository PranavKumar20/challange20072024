"use client";

import { useState } from "react";
import SPButton1 from "../components/SPButton1";
import CreateCampaign from "../components/CreateCampaign";
import UpdateCampaign from "../components/UpdateCampaign";
// import GetCampaigns from "../components/GetCampaigns";
// import HandleCalls from "../components/HandleCalls";
import Overview1 from "../components/Overview1";
import MakeCalls from "../components/MakeCalls";
import CallTranscript from "../components/CallTranscript";
import CallStatus from "../components/CallStatus";
import PostCallAnalysis from "../components/PostCallAnalysis";





import { LuChevronsUpDown } from "react-icons/lu";
import { MdOutlineSummarize } from "react-icons/md";
import { MdOutlineCampaign } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
// import { PiFileImageThin } from "react-icons/pi";
import { VscCallOutgoing } from "react-icons/vsc";
import { VscLayoutStatusbar } from "react-icons/vsc";
import { TbListDetails } from "react-icons/tb";


export default function Home() {
  const [dropDown, setDropDown] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);
  const [createCampaign, setCreateCampign] = useState(false);
  const [updateCampaign, setUpdateCampaign] = useState(false);
  const [getCampaigns, setGetCampaigns] = useState(false);
  const [makeCalls, setMakeCalls] = useState(false);
  const [callStatus, setCallStatus] = useState(false);
  const [callDetails, setCallDetails] = useState(false);
  const [callAnalysis, setCallAnalysis] = useState(false);
  const [overview, setOverview] = useState(true);

  function expandMenuClickHandler() {
    setDropDown(!dropDown);
  }
  
  function expandMenuClickHandler2() {
    setDropDown2(!dropDown2);
  }
  
  function createCampaignClickHandler() {
    setCreateCampign(true);
    setUpdateCampaign(false);
    setGetCampaigns(false);
    setOverview(false);
    setMakeCalls(false);
    setCallDetails(false);
    setCallStatus(false);
    setCallAnalysis(false)
  }
  
  function updateCampaignClickHandler() {
    setCreateCampign(false);
    setUpdateCampaign(true);
    setGetCampaigns(false);
    setOverview(false);
    setMakeCalls(false);
    setCallDetails(false);
    setCallStatus(false);
    setCallAnalysis(false)
  }
  
  function getCampaignsClickHandler(){
    setCreateCampign(false);
    setUpdateCampaign(false);
    setGetCampaigns(true);
    setOverview(false);
    setMakeCalls(false);
    setCallDetails(false);
    setCallStatus(false);
    setCallAnalysis(false)
  }
  
  function callHandlingClickHandler(){
    setCreateCampign(false);
    setUpdateCampaign(false);
    setGetCampaigns(false);
    setOverview(false);
    setMakeCalls(false);
    setCallDetails(false);
    setCallStatus(false);
    setCallAnalysis(false)
  }
  
  function overviewClickHandler(){
    setCreateCampign(false);
    setUpdateCampaign(false);
    setGetCampaigns(false);
    setOverview(true);
    setMakeCalls(false);
    setCallDetails(false);
    setCallStatus(false);
    setCallAnalysis(false)
  }
  
  function makeCallsClickHandler(){
    setCreateCampign(false);
    setUpdateCampaign(false);
    setGetCampaigns(false);
    setOverview(false);
    setMakeCalls(true);
    setCallDetails(false);
    setCallStatus(false);
    setCallAnalysis(false)
  }
  
  function callDetailsClickHandler(){
    setCreateCampign(false);
    setUpdateCampaign(false);
    setGetCampaigns(false);
    setOverview(false);
    setMakeCalls(false);
    setCallDetails(true);
    setCallStatus(false);
    setCallAnalysis(false)
  }
  
  function callAnalysisClickHandler(){
    setCreateCampign(false);
    setUpdateCampaign(false);
    setGetCampaigns(false);
    setOverview(false);
    setMakeCalls(false);
    setCallDetails(false);
    setCallStatus(false);
    setCallAnalysis(true)
  }
  
  function callsStatusClickHandler(){
    setCreateCampign(false);
    setUpdateCampaign(false);
    setGetCampaigns(false);
    setOverview(false);
    setMakeCalls(false);
    setCallDetails(false);
    setCallStatus(true);
    setCallAnalysis(false)
  }
  
  
  

  return (
    <main className="flex h-screen text-white text-md bg-black">
      <div className="w-1/6 flex flex-col pt-10 pl-4 ">
        <div className="text-4xl font-bold text-red-300 my-4 " >Logo</div>
        <div className="flex flex-row text-gray-300 hover:text-white" >
            <div className="text-lg mt-1 mr-1" ><MdOutlineSummarize /></div>
            <SPButton1 onClick={overviewClickHandler} label="Overview" />
        </div>
        <div className="my-1" >
          <div className="flex cursor-pointer" onClick={expandMenuClickHandler} >
            <div className="text-lg mt-1 mr-1" ><MdOutlineCampaign /></div>
            <SPButton1 label="Campaign" />
            <div className="mt-2 text-sm"><LuChevronsUpDown /></div>
          </div>
          {dropDown && (
            <div className="ml-8">
              <div className="flex flex-row" >
                <div className="text-lg mt-1 mr-2" ><MdOutlineCreateNewFolder /></div>
                <SPButton1 onClick={createCampaignClickHandler} label="Create Campaign" />
              </div>
              <div className="flex flex-row" >
                <div className="text-lg mt-1 mr-2" ><GrDocumentUpdate /></div>
                <SPButton1 onClick={updateCampaignClickHandler} label="Update Campaign" />
              </div>
              
            </div>
          )}
        </div>
      <div>
        <div className="flex cursor-pointer" onClick={expandMenuClickHandler2} >
          <div className="mt-1 text-lg mr-1 "><IoCallOutline /></div>
          <SPButton1 label="Handle Calls" />
          <div className="mt-2 text-sm" ><LuChevronsUpDown /></div>
        </div>
        {dropDown2 && (
          <div className="ml-8" >
            <div className="flex flex-row">
              <div className="text-lg mt-1 mr-2"><VscCallOutgoing /></div>
              <SPButton1 onClick={makeCallsClickHandler} label="Make Calls" />
            </div>
            <div className="flex flex-row">
              <div className="text-lg mt-1 mr-2"><VscLayoutStatusbar /></div>
              <SPButton1 onClick={callsStatusClickHandler} label="Call Status" />
            </div>
            <div className="flex flex-row">
              <div className="text-lg mt-1 mr-2"><TbListDetails /></div>
              <SPButton1 onClick={callDetailsClickHandler} label="Calls Transcript" />
            </div>
            <div className="flex flex-row">
              <div className="text-lg mt-1 mr-2"><TbListDetails /></div>
              <SPButton1 onClick={callAnalysisClickHandler} label="Calls Analysis" />
            </div>
          </div>
        )}
      </div>
      </div>
      <div className="w-5/6 border rounded-md border-gray-500 bg-slate-900 m-2 p-2">
        {overview && (
          <Overview1 />
        )}
        {createCampaign && (
          <CreateCampaign />
        )}
        {updateCampaign && (
          <UpdateCampaign />
        )}
        {makeCalls && (
          <MakeCalls />
        )}
        {callStatus && (
          <CallStatus />
        )}
        {callDetails && (
          <CallTranscript />
        )}
        {callAnalysis && (
          <PostCallAnalysis />
        )}
      </div>
    </main>
  );
}

// tg_540894db-826d-4213-b381-7b12d764ff73-riGyz9xq2LDAVXz_D3KflA


// <div className="flex flex-row" >
//                 <div className="text-lg mt-1 mr-2" ><PiFileImageThin /></div>
//                 <SPButton1 onClick={getCampaignsClickHandler} label="Get Campaign" />
//               </div>
