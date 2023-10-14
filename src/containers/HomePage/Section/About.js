import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói gì về Booking Care
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/Hx0s-ymgBVk"
              title="Cách Học Lâu Không Mệt"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <div>
              <p className="text-center fs-4 fw-bold">Cách Học Lâu Không Mệt</p>{" "}
              <br />
              Xin kính chào quý vị và các bạn, chào mừng tất cả quý vị và các
              bạn đã đến với bài học tâm huyết được phát sóng hàng tuần tối thứ
              7 trên kênh youtube của Web5ngay. Thưa quý vị và các bạn, trong
              cuộc sống đầy bận rộn và nhiều cám dỗ của chúng ta, khả năng học
              tập một cách hiệu quả và làm việc trí óc lâu mà không cảm thấy mệt
              mỏi là một lợi thế quan trọng cho ai sở hữu điều đó. Bất kể bạn là
              người đang đi học hoặc bạn đang làm việc trí óc và muốn nâng cao
              kiến thức, nâng cao hiệu suất học tập và làm việc thì đây chắc
              chắn là một kỹ năng rất cần thiết đối với bạn. Dựa trên quá trình
              học tập, làm việc và kinh nghiệm thực tế của tui, hôm nay tui sẽ
              đem đến cho quý vị và các bạn cách để chúng ta học tập và làm việc
              trong một thời gian dài mà không cảm thấy mệt.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
