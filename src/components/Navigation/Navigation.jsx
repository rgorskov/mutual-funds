import React from 'react';
import s from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className={s.navigation}>
            <section className={s.section}>
                <p className={s.sectionName}>Данные</p>
                <ul className={s.list}>
                    <li className={s.listItem}>
                        <NavLink
                            to="/loaddata"
                            className={s.link}
                            activeClassName={s.active}
                        >
                            <i class="fas fa-file-upload"></i>
                            <span>Исходные данные</span>
                        </NavLink>
                    </li>
                    {/* <li className={s.listItem}>
                        <NavLink
                            to="/datainfo"
                            className={s.link}
                            activeClassName={s.active}
                        >
                            <i class="fas fa-chart-bar"></i>
                            <span>Обзор данных</span>
                        </NavLink>
                    </li> */}
                </ul>
            </section>
            <section className={s.section}>
                <p className={s.sectionName}>Расчеты</p>
                <ul className={s.list}>
                    <li className={s.listItem}>
                        <NavLink
                            to="/setupparams"
                            className={s.link}
                            activeClassName={s.active}
                        >
                            <i class="fas fa-sliders-h"></i>
                            <span>Параметры</span>
                        </NavLink>
                    </li>
                    <li className={s.listItem}>
                        <NavLink
                            to="/risk"
                            className={s.link}
                            activeClassName={s.active}
                        >
                            <i class="fas fa-arrow-down"></i>
                            <span>Оценка риска</span>
                        </NavLink>
                    </li>
                    <li className={s.listItem}>
                        <NavLink
                            to="/yield"
                            className={s.link}
                            activeClassName={s.active}
                        >
                            <i class="fas fa-arrow-up"></i>
                            <span>Оценка доходности</span>
                        </NavLink>
                    </li>
                    <li className={s.listItem}>
                        <NavLink
                            to="/bestchoice"
                            className={s.link}
                            activeClassName={s.active}
                        >
                            <i class="fas fa-check"></i>
                            <span>Выбор лучшего ПИФа</span>
                        </NavLink>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Navigation;
