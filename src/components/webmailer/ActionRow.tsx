import React from "react";

/**
 * Come options for showing how to emulate Gmail using Bootsrap 4.
 */
export function ActionsRow() {
  return (
    <div className="row">
      <div className="col-12 col-sm-12 col-md-3 col-lg-2">
        <a href="#" className="btn btn-danger btn-primary btn-block">
          <i className="fa fa-edit"></i> Compose
        </a>
      </div>
      <div className="col-12 col-sm-12 col-md-9 col-lg-10">
        <div
          className="btn-group"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <button type="button" className="btn btn-secondary">
            &nbsp;<i className="fa fa-refresh" aria-hidden="true"></i>&nbsp;
          </button>
          <button type="button" className="btn btn-secondary">
            &nbsp;<i className="fa fa-star" aria-hidden="true"></i>&nbsp;
          </button>
        </div>
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            More
          </button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a className="dropdown-item" href="#">
              Action
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">
              Separated link
            </a>
          </div>
        </div>

        <div className="pull-right">
          <button type="button" className="btn btn-secondary">
            &nbsp;<i className="fa fa-cog" aria-hidden="true"></i>&nbsp;
          </button>
          <button type="button" className="btn btn-secondary">
            &nbsp;<i className="fa fa-bars" aria-hidden="true"></i>&nbsp;
          </button>
        </div>
      </div>
    </div>
  );
}
