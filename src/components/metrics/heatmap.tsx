"use client";
import { useEffect,useState } from "react";
type Row={date:string;category:string;demand_count:number;supply_count:number;response_count:number;resolved_count:number};
export function Heatmap(){const[rows,setRows]=useState<Row[]>([]);useEffect(()=>{fetch('/api/v1/metrics',{cache:'no-store'}).then(r=>r.json()).then(j=>setRows(j.data??[])).catch(()=>{});},[]);if(!rows.length)return <div className="panel"><p className="muted">供需热度数据正在积累。</p></div>;return <div className="panel"><div className="heat-grid">{rows.slice(0,40).map((r,i)=>{const score=r.demand_count+r.supply_count+r.response_count*2+r.resolved_count;return <div className="heat-cell" key={`${r.date}-${r.category}-${i}`}><strong>{r.category}</strong><span>{score}</span></div>})}</div></div>}
