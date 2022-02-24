import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { getGiftList, getWinterList } from '../Data/ProductData';

export default function ProductDetail() {
  //상태값 지정
  const [thisType, setThisType] = useState('detail')
  const [thisNum, setThisNum] = useState(0); //현재 상품의 선택 개체 수
  const [thisHover, setThisHover] = useState('detail'); //hover 기능 작동 제어용 : 기본은 detail로 지정(hover적용 대상)
  //테스트용
  console.log("*", thisHover)

  useEffect(() => {
    return (Show())
  })

  //url의 parameter를 변수로 저장
  let params = useParams();
  let productId = params.id; //이번 페이지에서 사용할 상품식별자
  console.log(productId)

  //데이터 셋팅
  let thisProductList = '' //현재 상품군 리스트
  let thisProduct = '' //현재 상품(id 일치 상품)

  //방한용품
  if (100 <= productId && productId < 200) {
    thisProductList = getWinterList();
  }

  //나를 위한 선물
  if (200 <= productId && productId < 300) {
    thisProductList = getGiftList();
  }

  //현재 상품의 정보만 담기
  thisProduct = thisProductList.find(item => item.id == productId)
  console.log(thisProduct)
  console.log(thisProductList)

  //상품설명
  function ShowDetail() {

    return (
      <div style={{ width: "100%" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem"
          }}
        >

          <div key={thisProduct.id}>
            <div>
              <p style={{ float: "top" }}>{thisProduct.name}</p>
              <p style={{ float: "top" }}>{thisProduct.price}</p>
            </div>
          </div>



        </nav>
      </div>
    );
  }

  //상품후기
  function ShowReview() {

    return (
      <div style={{ width: "100%" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem"
          }}
        >

          <div key={thisProduct.id}>
            <div>
              <p style={{ float: "left", width: "50%" }}>{thisProduct.name}</p>
              <p style={{ float: "left", width: "50%" }}>{thisProduct.describe}</p>
            </div>
          </div>

        </nav>
      </div>
    );
  }


  //화면에서 보여줄 내용(detail: 상품설명, review: 상품리뷰)
  function Show() {
    //기본적으로 상품설명이 노출
    let result = ShowDetail();

    //상품후기
    if (thisType === 'review') {
      result = ShowReview();
    }

    return (
      result
    )
  }

  // 참고 : https://projobs.tistory.com/98
  // function setLocalItems(k, value){
  //   if (typeof value === 'object') {
  //     value = JSON.stringify(value)
  //   }
  //   localStorage.setItem(k, value)
  // }


  //장바구니(localStorage에 저장)
  function ProductCart() {
    // let add = {num : thisNum};
    if (thisNum === 0) {
      return alert("1개 이상 선택해주세요.")
    }

    thisProduct.num = thisNum;

    let thisProductCart = thisProduct
    console.log(thisProductCart)

    let message = '이미 장바구니에 있습니다.';

    //메소드 구성: (key값, value)형태
    if (localStorage.getItem(productId) === null) {

      //localStorage에는 String 타입만 저장가능하므로 JSON형태의 데이터로 변환하여 저장
      let value = ''
      if (typeof thisProductCart === 'object') {
        value = JSON.stringify(thisProductCart)
      }

      localStorage.setItem(productId, value);
      message = '장바구니에 저장되었습니다.';
    }

    alert(message);
  }

  //CSS 셋팅
  function HoverDetail() {       //상품 설명의 hover 적용
    // 기본적으로 white 배경 적용
    let result = { background: "white", float: "left", position: "relative", width: "50%", textAlign: "center", height: "30px", paddingTop: "10px", fontFamily: " Noto Sans CJK KR", fontStyle: "normal", fontSize: "16px", fontWeight: "normal", };

    // hover 작동 시, 회색으로 변경
    if (thisHover === 'detail') {
      result = { background: "#EEEEEE", float: "left", position: "relative", width: "50%", textAlign: "center", height: "30px", paddingTop: "10px", fontFamily: " Noto Sans CJK KR", fontStyle: "normal", fontSize: "16px", fontWeight: "normal", };
    }

    return result;
  }

  function HoverReview() {       //상품 리뷰의 hover 적용
    // 기본적으로 white 배경 적용
    let result = { background: "white", float: "left", position: "relative", width: "50%", textAlign: "center", height: "30px", paddingTop: "10px", fontFamily: " Noto Sans CJK KR", fontStyle: "normal", fontSize: "16px", fontWeight: "normal", };

    // hover 작동 시, 회색으로 변경
    if (thisHover === 'review') {
      result = { background: "#EEEEEE", float: "left", position: "relative", width: "50%", textAlign: "center", height: "30px", paddingTop: "10px", fontFamily: " Noto Sans CJK KR", fontStyle: "normal", fontSize: "16px", fontWeight: "normal", };
    }

    return result;
  }


  return (
    <>
      <div style={{ paddingTop: "3%", backgroundColor: "white", zIndex: "2", position: "fixed", top: "0px", left: "0px", width: "100%", height: "26px" }}>
        <div style={{ float: "left", top: "0px", left: "0px", width: "33.3%", height: "8%", textAlign: 'center' }} onClick={()=>{window.history.back();}}>
          <img style={{height:"20px", width:"20px"}} src={process.env.PUBLIC_URL + '/Imgs/Allow.png'} alt={'뒤로 가기'}/>
        </div>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'Noto Sans KR', fontStyle: "normal", fontSize: "18px", fontWeight: "bold", color: "black", float: "left", top: "0px", left: "0px", width: "33.3%", height: "8%", textAlign: 'center' }}>토멘코 쇼핑</div>
        </Link>
        <Link to='/Cart' style={{ textDecoration: 'none' }}>
          <div style={{ paddingTop: "5px", fontFamily: 'Noto Sans KR', fontStyle: "normal", fontSize: "12px", fontWeight: "bold", color: "black", float: "left", top: "0px", left: "0px", width: "33.3%", height: "8%", textAlign: 'center' }}>장바구니</div>
        </Link>
      </div>
      <div style={{ zIndex: "1", float: "top", position: "absolute", top: "10%", width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <img style={{ float: "top", position: "relative", paddingLeft: "15px" }} src={process.env.PUBLIC_URL + `${thisProduct.image}`} alt={thisProduct.name} />
        </div>
        <div style={{ float: "top", position: "relative", width: "100%", left: "0px", height: "50px" }}>
          <div style={{ float: "left", position: "relative", width: "60%", left: "0px" }}>
            <div style={{ paddingTop:"15px", fontFamily: " Noto Sans CJK KR", fontStyle: "normal", fontSize: "20px", fontWeight: "bold", color: "black", paddingLeft: "30px", float: "top" }}>{thisProduct.name}</div>
            <div style={{ fontFamily: " Noto Sans CJK KR", fontStyle: "normal", fontSize: "16px", fontWeight: "normal", color: "black", paddingLeft: "30px", float: "top" }}>{thisProduct.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
          </div>


          <div style={{ float: "left", position: "relative", width: "40%", right: "0px", paddingTop: "10px" }}>
            <div style={{fontFamily: " Noto Sans CJK KR", fontStyle: "normal", fontSize: "16px", fontWeight: "normal", textAlign: "right", marginRight: "2px", height: "20px" }}>수량선택</div>
            <input style={{ marginTop: "15px", position: "relative", float: "right", marginRight: "5px" }} type='button' onClick={() => setThisNum(thisNum => thisNum + 1)} value='+' />
            <p style={{ position: "relative", float: "right", marginRight: "5px" }}>{thisNum}</p>
            <input style={{ marginTop: "15px", position: "relative", float: "right", marginRight: "5px" }} type='button' onClick={() => {
              if (thisNum === 0) {
                return;
              }
              setThisNum(thisNum => thisNum - 1);
            }} value='-' />
          </div>

        </div>

        <div style={{ float: "top", position: "relative" }}>
          <div style={HoverDetail()} onClick={() => { setThisType('detail'); setThisHover('detail') }} >상품설명</div>
          <div style={HoverReview()} onClick={() => { setThisType('review'); setThisHover('review') }}>상품후기</div>
        </div>
        <Show style={{ float: "top", position: "relative" }} />


        <div style={{ float: "top", paddingTop: "3%", backgroundColor: " #24DBAF", zIndex: "2", position: "fixed", bottom: "0px", left: "0px", width: "100%", height: "50px", fontFamily: 'Noto Sans KR', fontStyle: "normal", fontSize: "18px", fontWeight: "bold", color: "black", textAlign: "center" }} onClick={() => ProductCart()}>장바구니 담기</div>
      </div>

    </>

  )
}
