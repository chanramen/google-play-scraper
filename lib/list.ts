'use strict';

import request from "./utils/request.ts";
import {debug as debugInit, queryString as qs, R, url} from "../deps.ts"
import * as c from "./constants.ts"
import {BASE_URL, Collection} from "./constants.ts"
import * as scriptData from "./utils/scriptData.ts"
import {processFullDetailApps} from "./utils/processPages.ts";
import {ListRequestOptions, ListRequestOptionsReturnType} from "./interfaces/list/listRequestOptions.ts";
import {Method} from "./interfaces/options.ts";

const debug = debugInit('google-play-scraper:list');

function getBodyForRequests (payloadOpts) {
  const { num, collection, category } = payloadOpts;
  const body = `f.req=%5B%5B%5B%22vyAe2%22%2C%22%5B%5Bnull%2C%5B%5B8%2C%5B20%2C${num}%5D%5D%2Ctrue%2Cnull%2C%5B64%2C1%2C195%2C71%2C8%2C72%2C9%2C10%2C11%2C139%2C12%2C16%2C145%2C148%2C150%2C151%2C152%2C27%2C30%2C31%2C96%2C32%2C34%2C163%2C100%2C165%2C104%2C169%2C108%2C110%2C113%2C55%2C56%2C57%2C122%5D%2C%5Bnull%2Cnull%2C%5B%5B%5Btrue%5D%2Cnull%2C%5B%5Bnull%2C%5B%5D%5D%5D%2Cnull%2Cnull%2Cnull%2Cnull%2C%5Bnull%2C2%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B1%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B1%5D%5D%2C%5Bnull%2C%5B%5Bnull%2C%5B%5D%5D%5D%5D%2C%5Bnull%2C%5B%5Bnull%2C%5B%5D%5D%5D%2Cnull%2C%5Btrue%5D%5D%2C%5Bnull%2C%5B%5Bnull%2C%5B%5D%5D%5D%5D%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5B%5Bnull%2C%5B%5D%5D%5D%5D%2C%5B%5B%5Bnull%2C%5B%5D%5D%5D%5D%5D%2C%5B%5B%5B%5B7%2C1%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C31%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C104%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C9%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C8%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C27%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C12%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C65%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C110%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C88%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C11%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C56%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C55%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C96%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C10%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C122%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C72%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C71%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C64%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C113%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C139%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C150%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C169%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C165%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C151%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C163%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C32%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C16%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C108%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C100%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B9%2C1%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C31%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C104%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C9%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C8%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C27%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C12%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C65%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C110%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C88%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C11%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C56%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C55%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C96%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C10%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C122%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C72%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C71%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C64%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C113%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C139%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C150%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C169%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C165%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C151%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C163%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C32%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C16%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C108%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C100%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B17%2C1%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C31%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C104%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C9%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C8%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C27%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C12%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C65%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C110%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C88%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C11%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C56%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C55%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C96%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C10%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C122%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C72%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C71%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C64%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C113%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C139%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C150%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C169%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C165%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C151%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C163%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C32%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C16%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C108%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C100%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B10%2C1%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C31%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C104%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C9%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C8%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C27%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C12%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C65%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C110%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C88%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C11%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C56%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C55%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C96%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C10%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C122%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C72%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C71%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C64%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C113%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C139%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C150%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C169%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C165%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C151%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C163%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C32%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C16%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C108%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C100%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B1%2C1%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C31%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C104%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C9%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C8%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C27%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C12%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C65%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C110%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C88%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C11%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C56%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C55%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C96%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C10%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C122%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C72%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C71%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C64%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C113%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C139%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C150%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C169%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C165%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C151%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C163%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C32%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C16%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C108%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C100%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B4%2C1%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C31%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C104%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C9%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C8%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C27%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C12%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C65%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C110%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C88%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C11%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C56%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C55%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C96%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C10%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C122%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C72%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C71%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C64%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C113%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C139%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C150%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C169%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C165%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C151%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C163%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C32%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C16%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C108%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C100%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B3%2C1%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C31%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C104%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C9%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C8%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C27%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C12%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C65%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C110%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C88%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C11%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C56%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C55%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C96%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C10%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C122%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C72%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C71%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C64%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C113%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C139%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C150%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C169%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C165%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C151%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C163%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C32%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C16%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C108%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C100%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B2%2C1%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C31%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C104%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C9%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C8%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C27%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C12%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C65%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C110%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C88%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C11%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C56%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C55%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C96%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C10%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C122%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C72%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C71%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C64%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C113%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C139%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C150%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C169%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C165%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C151%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C163%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C32%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C16%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C108%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C100%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%5D%5D%5D%2Cnull%2Cnull%2C%5B%5B%5B1%2C2%5D%2C%5B10%2C8%2C9%5D%2C%5B%5D%2C%5B%5D%5D%5D%5D%2C%5B2%2C%5C%22${collection}%5C%22%2C%5C%22${category}%5C%22%5D%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=AFSRYlx8XZfN8-O-IKASbNBDkB6T%3A1655531200971&`;

  return body;
}

function list<T extends ListRequestOptions>(opts: T): Promise<ListRequestOptionsReturnType<T>[]> {
  return new Promise(function (resolve, reject) {
    validate(opts);

    const fullListOpts = Object.assign({
      lang: 'en',
      country: 'us',
      num: 500
    }, opts);

    const body = getBodyForRequests({
      num: fullListOpts.num,
      collection: CLUSTER_NAMES[fullListOpts.collection ?? Collection.TOP_FREE],
      category: fullListOpts.category
    });

    const requestOptions = Object.assign({
      url: buildInitialUrl(fullListOpts),
      method: Method.POST,
      body,
      followRedirect: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }, opts.requestOptions);

    request(requestOptions, opts.throttle)
      .then((html) => {
        const input = JSON.parse(html.split('\n')[3]);
        return JSON.parse(input[0][2]);
      })
      .then(collectionObject => parseCollectionApps(collectionObject, opts))
      .then(resolve)
      .catch(reject);
  });
}

function validate (opts) {
  opts.category = opts.category || c.Category.APPLICATION;
  if (opts.category && !R.includes(opts.category, R.values(c.Category))) {
    throw Error('Invalid category ' + opts.category);
  }

  opts.collection = opts.collection || c.Collection.TOP_FREE;
  if (!R.includes(opts.collection, R.values(c.Collection))) {
    throw Error(`Invalid collection ${opts.collection}`);
  }

  if (opts.age && !R.includes(opts.age, R.values(c.Age))) {
    throw Error(`Invalid age range ${opts.age}`);
  }
}

function buildInitialUrl (opts) {
  const queryString : {
    hl: string
    gl: string
    age?: number
  }= {
    hl: opts.lang,
    gl: opts.country
  };

  if (opts.age) {
    queryString.age = opts.age;
  }
  const url = `${BASE_URL}/_/PlayStoreUi/data/batchexecute?rpcids=vyAe2&source-path=%2Fstore%2Fapps&f.sid=-4178618388443751758&bl=boq_playuiserver_20220612.08_p0&authuser=0&soc-app=121&soc-platform=1&soc-device=1&_reqid=82003&rt=c`;

  const fullURL = `${url}&${qs.stringify(queryString)}`;

  debug('Initial Request URL: %s', fullURL);

  return fullURL;
}

const CLUSTER_NAMES = {
  TOP_FREE: 'topselling_free',
  TOP_PAID: 'topselling_paid',
  GROSSING: 'topgrossing'
};

async function parseCollectionApps (categoryObject, opts) {
  const appsMappings = {
    title: [0, 3],
    appId: [0, 0, 0],
    url: {
      path: [0, 10, 4, 2],
      fun: (path) => new url.URL(path, BASE_URL).toString()
    },
    icon: [0, 1, 3, 2],
    developer: [0, 14],
    currency: [0, 8, 1, 0, 1],
    price: {
      path: [0, 8, 1, 0, 0],
      fun: (price) => price / 1000000
    },
    free: {
      path: [0, 8, 1, 0, 0],
      fun: (price) => price === 0
    },
    summary: [0, 13, 1],
    scoreText: [0, 4, 0],
    score: [0, 4, 1]
  };
  const appsPath = [0, 1, 0, 28, 0];
  const processedApps = R.map(scriptData.extractor(appsMappings), R.path(appsPath, categoryObject));
  const apps = opts.fullDetail
    ? await processFullDetailApps(processedApps, opts)
    : processedApps;
  return apps;
}

export default list
