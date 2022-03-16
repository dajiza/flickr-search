import React, { useState, useEffect, useContext } from 'react'
import './search.css'
import axios from 'axios'
const arr = [0, 1, 2, 3]
function Search() {
    const [list, setList] = useState([])
    const [showList, setShowList] = useState([])
    const [index, setIndex] = useState(0)
    const [finish, setFinish] = useState(0)
    const [init, setInit] = useState(1)
    const [value, setValue] = useState(1)
    return (
        <div className='content'>
            <div className='input_wrap'>
                <input type='text' placeholder='' onChange={onChange} />
                <div className='submit' onClick={search}>
                    search
                </div>
            </div>
            <div className='result'>
                <div className='list'>
                    {arr.map((item) => {
                        return (
                            <div className='column' key={item}>
                                {showList.map((img, index) => {
                                    if (index % 4 === item) {
                                        return (
                                            <div className='img-box' key={img}>
                                                <img src={img} alt='' />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>
                {renderMore()}
            </div>
        </div>
    )
    function search() {
        setFinish(0)
        setInit(0)
        setIndex(0)
        setList([])
        setShowList([])
        if (!value) {
            return
        }
        axios
            .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&text=${value}`)
            .then(function (res) {
                let imgs = res.data.photos.photo
                imgs = imgs.map((item) => {
                    return `http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`
                })
                let list = formatList(imgs, 10)
                setList(list)
                let newShowList = [...showList, ...list[index]]
                setShowList(newShowList)
                setIndex(index + 1)
            })
    }

    function more() {
        if (index < list.length) {
            let newShowList = [...showList, ...list[index]]
            setShowList(newShowList)
            setIndex(index + 1)
        }
        if (index === list.length - 1) {
            setFinish(1)
        }
    }
    function formatList(arr, count) {
        let newArr = []
        while (arr.length > 0) {
            let chunk = arr.splice(0, count)
            newArr.push(chunk)
        }
        return newArr
    }
    function renderMore() {
        if (finish === 0 && init === 0) {
            return (
                <div className='more' onClick={more}>
                    more
                </div>
            )
        }
        if (finish === 1 && init === 0) {
            return <div className='finish'>===finish===</div>
        }
    }
    function onChange(e) {
        setValue(e.target.value)
    }
}
export default Search
