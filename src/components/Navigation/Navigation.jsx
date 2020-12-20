import React from 'react';
import s from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className={s.navigation}>
      <section className={s.section}>
        <p className={s.sectionName}>Данные</p>
        <NavLink to="/loaddata" className={s.item} activeClassName={s.active}>
          <i className="bi bi-upload"></i>
          <span>Исходные данные</span>
        </NavLink>
        <NavLink to="/datainfo" className={s.item} activeClassName={s.active}>
          <i class="bi bi-graph-up"></i>
          <span>Обзор данных</span>
        </NavLink>
      </section>
      <section className={s.section}>
        <p className={s.sectionName}>Расчеты</p>
        <NavLink
          to="/setupparams"
          className={s.item}
          activeClassName={s.active}
        >
          <i class="bi bi-gear"></i>
          <span>Параметры</span>
        </NavLink>
        <NavLink to="/risk" className={s.item} activeClassName={s.active}>
          <i class="bi bi-arrow-down"></i>
          <span>Оценка риска</span>
        </NavLink>
        <NavLink to="/yield" className={s.item} activeClassName={s.active}>
          <i class="bi bi-arrow-up"></i>
          <span>Оценка доходности</span>
        </NavLink>
        <NavLink to="/bestchoice" className={s.item} activeClassName={s.active}>
          <i class="bi bi-check2"></i>
          <span>Выбор лучшего ПИФа</span>
        </NavLink>
      </section>
    </div>
  );
};

export default Navigation;
