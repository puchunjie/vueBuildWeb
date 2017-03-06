const LATENCY = 16;
const dragNum = 1; //通栏数
const moduleNum = 1; //通栏模块数
const moduleOrderNum = 8; //每列图片数
const moduleTopOffset = 12; //模块top偏移量
const moduleLeftOffset = 10; //模块left偏移量
const moduleOrderLeftOffset = 300; //模块left偏移量

import { apiMock } from '../alldata/mock-api'
import { singleDragMock } from '../drags/mock-drag'
/**
 * 引用假数据
 */
import { singlePictureMock } from '../picture/mock-picture'
import { singleMenubaseMock } from '../menubase/mock-menubase'
import { singleWordMock } from '../word/mock-word'
import { singleBannercarouselMock } from '../bannerCarousel/mock-bannerCarousel'
import { singleListMock } from '../list/mock-list'
import { singleAtlasXMock } from '../atlas/mock-atlasX'
import { singleAtlasXQMock } from '../atlas/mock-atlasXQ'
import { singleAtlasYMock } from '../atlas/mock-atlasY'
import { singleAtlasYQMock } from '../atlas/mock-atlasYQ'
import { singleAtlasXScaleMock } from '../atlas/mock-atlasXScale'
import { singleAtlasYScaleMock } from '../atlas/mock-atlasYScale'
import { singleAtlasPianoMock } from '../atlas/mock-atlasPiano'
import { singleProductMock } from '../product/mock-product'
import { singleProductCoverMock } from '../product/mock-product-cover'
import { singleProductTCoverMock } from '../product/mock-product-titleCover'
import { singleProductZirMock } from '../product/mock-product-zir'
/************/
import { getUuid } from 'commonHelpers/utils'

export function getAllDrags(cb) {
    setTimeout(() => {
        let k = 1;
        let apiData = apiMock();
        for (let i = 0; i < dragNum; i++) {
            let drag = singleDragMock();
            drag.index = i;
            drag.moduleId = "drag_" + i;
            drag.name = "我是假通栏" + i;

            for (let j = 0; j < moduleNum; j++) {
                let module = singleAtlasXScaleMock();
                module.dragKey = i;
                module.slotModeulesKey = j;
                module.moduleId = module.moduleName + getUuid();
                module["$styles"].container['z-index'] = k;
                module["$styles"].container['left'] = (parseInt(module["$styles"].container['left']) + parseInt(j / moduleOrderNum) * moduleOrderLeftOffset + parseInt((j % moduleOrderNum) * moduleLeftOffset)) + 'px';
                module["$styles"].container['top'] = (parseInt(module["$styles"].container['top']) + parseInt((j % moduleOrderNum) * moduleTopOffset)) + 'px';
                drag.slotModeules.push(module);

                k++;
            }
            apiData.json.content.push(drag);
        }
        cb(apiData)
    }, LATENCY)
}